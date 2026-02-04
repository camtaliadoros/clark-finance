import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug parameter is required' },
      { status: 400 }
    );
  }

  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/case-study?slug=${slug}&_fields=acf.case_study_title,acf.loan_value,acf.location,acf.the_requirement,acf.the_interesting_stuff,acf.how_we_helped,acf.featured_image`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch case study from WordPress:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to retrieve case study' },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving case study:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve case study' },
      { status: 500 }
    );
  }
}
