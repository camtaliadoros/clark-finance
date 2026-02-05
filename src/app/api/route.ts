import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/util/fetchWithTimeout';
import { cacheStrategies } from '@/util/cacheHeaders';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetchWithTimeout(
      `${process.env.WP_ROUTE}/pages/7?_fields=acf,yoast_head_json`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000, // 15 seconds for WordPress API
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
    // Check if it's a timeout error
    if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json(
        { error: 'Request timeout - please try again' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to retrieve content' },
      { status: 500 }
    );
  }
}
