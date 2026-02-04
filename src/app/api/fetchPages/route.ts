import { NextResponse } from 'next/server';
import { cacheStrategies } from '@/util/cacheHeaders';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages?per_page=30&_fields=slug,id,acf.menu_location,acf.menu_position,acf.service_card.homepage_order,acf.page_title,parent`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch pages from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve pages' },
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
    console.error('Error retrieving pages:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve pages' },
      { status: 500 }
    );
  }
}
