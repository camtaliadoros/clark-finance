import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currentPage = searchParams.get('page');
  const itemsPerPage = searchParams.get('items');

  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const response = await fetch(
    `${process.env.WP_ROUTE}/case-study?page=${currentPage}&per_page=${itemsPerPage}&_fields=acf.case_study_title,acf.case_study_excerpt,acf.loan_value,acf.location,acf.featured_image,slug,link`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  const totalPages = response.headers.get('X-WP-TotalPages');

  const caseStudiesData = {
    pageData: data,
    totalPages: totalPages,
  };

  return Response.json(caseStudiesData);
}
