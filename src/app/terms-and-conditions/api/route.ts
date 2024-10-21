export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages/131?_fields=acf,yoast_head_json`,
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
