import { NextRequest, NextResponse } from 'next/server';
import { validatePagination } from '@/util/validateParams';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currentPage = searchParams.get('page');
  const itemsPerPage = searchParams.get('items');

  // Validate pagination parameters
  const pagination = validatePagination(currentPage, itemsPerPage, 100);
  if (!pagination) {
    return NextResponse.json(
      { error: 'Invalid pagination parameters' },
      { status: 400 }
    );
  }

  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/case-study?page=${pagination.page}&per_page=${pagination.perPage}&_fields=acf.case_study_title,acf.case_study_excerpt,acf.loan_value,acf.location,acf.featured_image,slug,link`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch case studies from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve case studies' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    const totalPages = response.headers.get('X-WP-TotalPages');

    const caseStudiesData = {
      pageData: data,
      totalPages: totalPages,
    };

    return NextResponse.json(caseStudiesData);
  } catch (error) {
    console.error('Error retrieving case studies:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve case studies' },
      { status: 500 }
    );
  }
}
