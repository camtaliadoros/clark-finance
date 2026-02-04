import { NextResponse } from 'next/server';
import { cacheStrategies } from '@/util/cacheHeaders';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages/88?_fields=acf,yoast_head_json`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch content from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve content' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': cacheStrategies.staticPage(),
      },
    });
  } catch (error) {
    console.error('Error retrieving content:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve content' },
      { status: 500 }
    );
  }
}
