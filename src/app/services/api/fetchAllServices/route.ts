import { NextResponse } from 'next/server';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages?parent=249&_fields=slug,link,acf.service_card.service_title,acf.service_card.homepage_order`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch services from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve services' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving services:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve services' },
      { status: 500 }
    );
  }
}
