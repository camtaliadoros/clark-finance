import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get('slug');

  const response = await fetch(
    `${process.env.WP_ROUTE}/service?slug=${slug}&_fields=acf,slug,link`
  );
  const data = await response.json();

  return Response.json(data);
}
