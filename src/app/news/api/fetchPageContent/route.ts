export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const response = await fetch(
    `${process.env.WP_ROUTE}/pages/229?_fields=acf.page_title,acf.subheading`,
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
