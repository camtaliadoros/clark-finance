import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const { searchParams } = new URL(req.url);
  const currentPage = searchParams.get('page');
  const itemsPerPage = searchParams.get('per_page');

  const response = await fetch(
    `${process.env.WP_ROUTE}/article?page=${currentPage}&per_page=${itemsPerPage}&_fields=acf,date,slug`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  const totalPages = response.headers.get('X-WP-TotalPages');

  const articlesData = {
    pageData: data,
    totalPages: totalPages,
  };

  return Response.json(articlesData);
}
