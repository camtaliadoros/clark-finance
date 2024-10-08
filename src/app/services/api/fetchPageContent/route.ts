export async function GET() {
  const encodedCredentials = btoa(`wordify:xkchirst`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages/249?_fields=acf`,
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
