export async function GET() {
  // const encodedCredentials = btoa(`wordify:xkchirst`);

  const response = await fetch(
    `${process.env.WP_ROUTE}/pages?parent=249&_fields=slug,link,acf`
    // {
    //   headers: {
    //     Authorization: `Basic ${encodedCredentials}`,
    //     'Content-Type': 'application/json',
    //   },
    // }
  );
  const data = await response.json();

  console.log('here');

  return Response.json(data);
}
