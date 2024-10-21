import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get('id');

  try {
    const response = await fetch(
      `https://clarkfinance.wordifysites.com/wp-json/wp/v2/pages/${pageId}?_fields=yoast_head_json`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    console.log('data: !!!!!!!');
    console.log(data);
    console.log('data: !!!!!!!');

    return Response.json(data);
  } catch (e) {
    throw new Error('There was a problem retrieving the content: ' + e);
  }
}
