import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currentPage = searchParams.get('page');
  const itemsPerPage = 6;

  const response = await fetch(
    `${process.env.WP_ROUTE}/case-study?page=${currentPage}&per_page=${itemsPerPage}&_fields=acf,slug,link`
  );
  const data = await response.json();

  const totalPages = response.headers.get('X-WP-TotalPages');

  const caseStudiesData = {
    pageData: data,
    totalPages: totalPages,
  };

  return Response.json(caseStudiesData);
}
