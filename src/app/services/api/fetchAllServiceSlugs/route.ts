import { NextResponse } from 'next/server';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages?parent=249&_fields=slug`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch service slugs from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve service slugs' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving service slugs:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve service slugs' },
      { status: 500 }
    );
  }
}
