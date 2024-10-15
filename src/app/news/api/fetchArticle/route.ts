import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/article?slug=${slug}&_fields=acf.title,acf.headline,acf.article_body,acf.featured_image,date`,
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
