import { NextRequest, NextResponse } from 'next/server';
import { cacheStrategies } from '@/util/cacheHeaders';
import { validateSlug } from '@/util/validateParams';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

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
      `${process.env.WP_ROUTE}/article?slug=${validatedSlug}&_fields=acf.title,acf.headline,acf.article_body,acf.featured_image,date`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch article from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve article' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': cacheStrategies.dynamicContent(),
      },
    });
  } catch (error) {
    console.error('Error retrieving article:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve article' },
      { status: 500 }
    );
  }
}
