import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code is missing' },
      { status: 400 }
    );
  }

  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const redirectUri = process.env.ZOHO_REDIRECT_URI;

  const tokenUrl = ' https://accounts.zoho.eu/oauth/v2/token';
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId || '',
    client_secret: clientSecret || '',
    redirect_uri: redirectUri || '',
    code,
  });

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error }, { status: 400 });
    }

    const { access_token, refresh_token } = tokenData;

    // Write the tokens to .env (For example purposes)
    writeFileSync(
      '.env',
      `ZOHO_ACCESS_TOKEN=${access_token}\nZOHO_REFRESH_TOKEN=${refresh_token}`,
      { flag: 'a' }
    );

    return NextResponse.json({ message: 'Authorization successful' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Token exchange failed' },
      { status: 500 }
    );
  }
}
