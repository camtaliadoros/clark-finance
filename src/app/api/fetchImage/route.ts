import { NextRequest, NextResponse } from 'next/server';
import { isValidId } from '@/util/validateParams';
import { cacheStrategies } from '@/util/cacheHeaders';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get('id');

  if (!imageId || !isValidId(imageId)) {
    return NextResponse.json(
      { error: 'Invalid image ID' },
      { status: 400 }
    );
  }

  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/media/${imageId}?_fields=source_url,alt_text,id`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch image from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve image' },
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
    console.error('Error retrieving image:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve image' },
      { status: 500 }
    );
  }
}
