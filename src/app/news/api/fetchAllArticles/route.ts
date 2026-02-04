import { NextRequest, NextResponse } from 'next/server';
import { validatePagination } from '@/util/validateParams';
import { cacheStrategies } from '@/util/cacheHeaders';

export async function GET(req: NextRequest) {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const { searchParams } = new URL(req.url);
  const currentPage = searchParams.get('page');
  const itemsPerPage = searchParams.get('per_page');

  // Validate pagination parameters
  const pagination = validatePagination(currentPage, itemsPerPage, 100);
  if (!pagination) {
    return NextResponse.json(
      { error: 'Invalid pagination parameters' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/article?page=${pagination.page}&per_page=${pagination.perPage}&_fields=acf.title,acf.headline,acf.featured_image,date,slug`,
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

    return NextResponse.json(articlesData, {
      headers: {
        'Cache-Control': cacheStrategies.paginatedList(),
      },
    });
  } catch (error) {
    console.error('Error retrieving articles:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve articles' },
      { status: 500 }
    );
  }
}
