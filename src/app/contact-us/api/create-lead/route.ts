import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { error } from 'console';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phoneNumber, message, token } =
    await req.json();

  // Verify the reCAPTCHA token
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    }
  );

  const recaptchaData = await recaptchaResponse.json();

  if (recaptchaData.success && recaptchaData.score > 0.5) {
    require('dotenv').config(); // Load environment variables from .env file
    const fs = require('fs').promises;

    let accessToken = process.env.ZOHO_ACCESS_TOKEN;

    // Function to refresh token if expired
    const refreshAccessToken = async () => {
      const clientId = process.env.ZOHO_CLIENT_ID;
      const clientSecret = process.env.ZOHO_CLIENT_SECRET;
      const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

      const body = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId || '',
        client_secret: clientSecret || '',
        refresh_token: refreshToken || '',
      });

      const tokenUrl = 'https://accounts.zoho.eu/oauth/v2/token';
      const tokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error);
      }

      // Update stored tokens
      await updateEnv('ZOHO_ACCESS_TOKEN', tokenData.access_token); // Update the access token

      return tokenData.access_token;
    };

    try {
      const zohoApiUrl = 'https://www.zohoapis.com/crm/v3/Leads';
      const leadData = {
        data: [
          {
            First_Name: firstName,
            Last_Name: lastName,
            Email: email,
            Phone: phoneNumber,
          },
        ],
      };

      const response = await fetch(zohoApiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(leadData),
      });

      // If access token is expired, refresh it and retry
      if (response.status === 401) {
        accessToken = await refreshAccessToken();

        // Retry the request with the new access token
        const retryResponse = await fetch(zohoApiUrl, {
          method: 'POST',
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData),
        });

        const retryData = await retryResponse.json();

        return NextResponse.json(retryData, { status: 200 });
      }

      const data = await response.json();

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: 'Recaptcha failed' });
  }
}

async function updateEnv(key: string, value: string) {
  const envPath = './.env'; // Path to your .env file
  const data = await fs.readFile(envPath, 'utf8');

  // Update the value for the given key
  const newData = data.replace(
    new RegExp(`^${key}=.*`, 'm'),
    `${key}=${value}`
  );

  // Write the updated content back to .env
  await fs.writeFile(envPath, newData, 'utf8');
}
