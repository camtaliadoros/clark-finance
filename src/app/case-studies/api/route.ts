import { NextResponse } from 'next/server';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/case-study?_fields=acf,slug,link`,
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

    const contentRes = await fetch(
      `${process.env.WP_ROUTE}/pages/203?_fields=acf`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!contentRes.ok) {
      console.error('Failed to fetch case studies page content from WordPress:', contentRes.status, contentRes.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve case studies page content' },
        { status: contentRes.status || 500 }
      );
    }

    const contentData = await contentRes.json();

    const caseStudiesPageData = {
      content: contentData,
      caseStudiesData: data,
    };

    return NextResponse.json(caseStudiesPageData);
  } catch (error) {
    console.error('Error retrieving case studies:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve case studies' },
      { status: 500 }
    );
  }
}
