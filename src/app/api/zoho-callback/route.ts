import { NextRequest, NextResponse } from 'next/server';

import dotenv from 'dotenv';
import { db } from '@/util/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { fetchWithTimeout } from '@/util/fetchWithTimeout';
import { rateLimit, getClientIp, rateLimitPresets } from '@/util/rateLimit';

dotenv.config();

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Rate limiting: 10 requests per 15 minutes per IP (for OAuth callback)
  const clientIp = getClientIp(req);
  const rateLimitResult = rateLimit(clientIp, {
    windowMs: 15 * 60 * 1000,
    maxRequests: 10,
  });

  if (!rateLimitResult.success) {
    const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        retryAfter,
      },
      { 
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
        },
      }
    );
  }

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
    const tokenResponse = await fetchWithTimeout(tokenUrl, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 10000, // 10 seconds for token exchange
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Zoho token exchange error:', tokenData.error);
      return NextResponse.json(
        { error: 'Authorization failed' },
        { status: 400 }
      );
    }

    const { access_token, refresh_token } = tokenData;

    await db.doc('tokens/accessToken').set({
      access_token,
      last_updated: Timestamp.fromDate(new Date()),
    });

    await db.doc('tokens/refreshToken').set({
      refresh_token,
    });

    return NextResponse.json({ message: 'Authorization successful' });
  } catch (error) {
    console.error('Error in token exchange:', error);
    // Check if it's a timeout error
    if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json(
        { error: 'Token exchange timeout' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'Token exchange failed' },
      { status: 500 }
    );
  }
}
