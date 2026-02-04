import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const { searchParams } = new URL(req.url);
  const currentPage = searchParams.get('page');
  const itemsPerPage = searchParams.get('per_page');

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/article?page=${currentPage}&per_page=${itemsPerPage}&_fields=acf.title,acf.headline,acf.featured_image,date,slug`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch articles from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve articles' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    const totalPages = response.headers.get('X-WP-TotalPages');

    const articlesData = {
      pageData: data,
      totalPages: totalPages,
    };

    return NextResponse.json(articlesData);
  } catch (error) {
    console.error('Error retrieving articles:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve articles' },
      { status: 500 }
    );
  }
}
