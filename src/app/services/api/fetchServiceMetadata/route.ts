import { NextRequest, NextResponse } from 'next/server';
import { cacheStrategies } from '@/util/cacheHeaders';
import { validateSlug } from '@/util/validateParams';

export async function GET(req: NextRequest) {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  const validatedSlug = validateSlug(slug);
  if (!validatedSlug) {
    return NextResponse.json(
      { error: 'Invalid slug parameter' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages?slug=${validatedSlug}&_fields=yoast_head_json`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch service metadata from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve service metadata' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': cacheStrategies.metadata(),
      },
    });
  } catch (error) {
    console.error('Error retrieving service metadata:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve service metadata' },
      { status: 500 }
    );
  }
}
