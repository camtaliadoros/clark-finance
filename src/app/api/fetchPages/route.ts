export async function GET() {
  const encodedCredentials = btoa(`wordify:xkchirst`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages?_fields=slug,id,acf,parent`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
    const data = await response.json();

    return Response.json(data);
  } catch (e) {
    throw new Error('There was a problem retrieving the content: ' + e);
  }
}
