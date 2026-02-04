import { NextRequest, NextResponse } from 'next/server';
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
      `${process.env.WP_ROUTE}/pages?slug=${validatedSlug}&_fields=acf,slug,link`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch service page content from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve service page content' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving service page content:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve service page content' },
      { status: 500 }
    );
  }
}
