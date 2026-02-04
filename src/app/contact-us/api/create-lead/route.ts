import { db } from '@/util/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for create lead request
const createLeadSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name must be less than 100 characters')
    .trim(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .max(20, 'Phone number must be less than 20 characters')
    .trim(),
  message: z
    .string()
    .max(5000, 'Message must be less than 5000 characters')
    .optional()
    .default(''),
  recapthaToken: z
    .string()
    .min(1, 'reCAPTCHA token is required'),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validationResult = createLeadSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid input data',
          details: validationResult.error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phoneNumber, message, recapthaToken } = validationResult.data;

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
        console.error('Error creating lead:', error);
        return NextResponse.json(
          { error: 'Failed to create lead' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    // Handle JSON parsing errors or other unexpected errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    console.error('Unexpected error in create-lead route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
