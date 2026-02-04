import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/article?slug=${slug}&_fields=acf.title,acf.headline,acf.article_body,acf.featured_image,date`,
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
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving article:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve article' },
      { status: 500 }
    );
  }
}
