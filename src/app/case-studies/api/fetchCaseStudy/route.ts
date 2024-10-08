import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/case-study?slug=${slug}&_fields=acf`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    return Response.json(data);
  } catch (e) {
    throw new Error('There was a problem retrieving the content: ' + e);
  }
}
