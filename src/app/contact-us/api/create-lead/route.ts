import { db } from '@/util/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phoneNumber, message, recapthaToken } =
    await req.json();

  // Verify the reCAPTCHA token
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recapthaToken}`,
    }
  );

  const recaptchaData = await recaptchaResponse.json();

  if (recaptchaData.success && recaptchaData.score > 0.5) {
    const zohoAccessTokenRef = db.doc('tokens/accessToken');
    const accessTokenDocSnap = await zohoAccessTokenRef.get();

    let accessToken: string;
    let refreshToken;

    if (accessTokenDocSnap.exists) {
      const zohoTokenData = accessTokenDocSnap.data();
      accessToken = zohoTokenData?.access_token;
    } else {
      return NextResponse.json({
        error: 'Could not retrieve Zoho Access Token',
      });
    }

    const zohoRefreshTokenRef = db.doc('tokens/refreshToken');
    const refreshTokenDocSnap = await zohoRefreshTokenRef.get();

    if (refreshTokenDocSnap.exists) {
      const zohoTokenData = refreshTokenDocSnap.data();
      refreshToken = zohoTokenData?.refresh_token;
    } else {
      return NextResponse.json({
        error: 'Could not retrieve Zoho Refresh Token',
      });
    }

    // Function to refresh token if expired
    const refreshAccessToken = async () => {
      const clientId = process.env.ZOHO_CLIENT_ID;
      const clientSecret = process.env.ZOHO_CLIENT_SECRET;

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
      // Update stored tokens with the NEW token from response
      const newAccessToken = tokenData.access_token;

      await db.doc('tokens/accessToken').set({
        access_token: newAccessToken,
        last_updated: Timestamp.fromDate(new Date()),
      });

      return newAccessToken;
    };

    try {
      const zohoApiUrl = 'https://www.zohoapis.eu/crm/v5/Leads';
      const leadData = {
        data: [
          {
            First_Name: firstName,
            Last_Name: lastName,
            Email: email,
            Phone: phoneNumber,
            Description: message,
            Lead_Source: 'Website Form',
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
    return NextResponse.json({ error: 'reCAPTCHA failed' });
  }
}
