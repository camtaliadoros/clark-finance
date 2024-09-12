import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  const response = await fetch(
    `${process.env.WP_ROUTE}/article?slug=${slug}&_fields=acf,date`
  );
  const data = await response.json();

  return Response.json(data);
}
