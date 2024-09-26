import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currentPage = searchParams.get('page');
  const itemsPerPage = 6;

  const response = await fetch(
    `${process.env.WP_ROUTE}/article?page=${currentPage}&per_page=${itemsPerPage}&_fields=acf,date,slug`
  );

  const data = await response.json();

  const totalPages = response.headers.get('X-WP-TotalPages');

  const articlesData = {
    pageData: data,
    totalPages: totalPages,
  };

  return Response.json(articlesData);
}
