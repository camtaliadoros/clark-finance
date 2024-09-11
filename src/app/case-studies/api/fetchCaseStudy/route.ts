import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  const response = await fetch(
    `${process.env.WP_ROUTE}/case-study?slug=${slug}&_fields=acf`
  );
  const data = await response.json();

  return Response.json(data);
}
