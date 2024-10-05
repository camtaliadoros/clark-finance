export async function GET() {
  const encodedCredentials = btoa(`wordify:xkchirst`);

  try {
    const response = await fetch(
      `https://clarkfinance.wordifysites.com/wp-json/wp/v2/pages/7?_fields=acf`,
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
