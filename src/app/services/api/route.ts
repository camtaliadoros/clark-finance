export async function GET() {
  const encodedCredentials = btoa(`wordify:xkchirst`);

  const response = await fetch(
    `${process.env.WP_ROUTE}/service?_fields=acf,slug,link`,
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
