import { NextResponse } from 'next/server';
import { cacheStrategies } from '@/util/cacheHeaders';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages?parent=249&_fields=slug,link,acf.service_card.homepage_order,acf.service_card.service_title,acf.service_card.service_excerpt`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch service cards from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve service cards' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': cacheStrategies.navigation(),
      },
    });
  } catch (error) {
    console.error('Error retrieving service cards:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve service cards' },
      { status: 500 }
    );
  }
}
