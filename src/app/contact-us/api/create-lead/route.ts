import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phoneNumber, message } = await req.json();

  const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'utf8'));
  let { access_token, refresh_token } = tokenData;

  // Function to refresh token if expired
  const refreshAccessToken = async () => {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId || '',
      client_secret: clientSecret || '',
      refresh_token: refresh_token || '',
    });

    const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
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
    await fs.writeFile(
      './tokens.json',
      JSON.stringify({
        access_token: tokenData.access_token,
        refresh_token, // Keep the old refresh token
      })
    );

    return tokenData.access_token;
  };

  try {
    const zohoApiUrl = 'https://www.zohoapis.com/crm/v2/Leads';
    const leadData = {
      data: [
        {
          First_Name: firstName,
          Last_Name: lastName,
          Email: email,
          Phone: phoneNumber,
          Message: message,
        },
      ],
    };

    const response = await fetch(zohoApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    // If access token is expired, refresh it and retry
    if (response.status === 401) {
      access_token = await refreshAccessToken();

      // Retry the request with the new access token
      const retryResponse = await fetch(zohoApiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
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
}
