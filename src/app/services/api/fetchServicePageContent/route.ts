import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const { searchParams } = new URL(req.url);

  const slug = searchParams.get('slug');

  const response = await fetch(
    `${process.env.WP_ROUTE}/pages?slug=${slug}&_fields=acf,slug,link`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  return Response.json(data);
}
