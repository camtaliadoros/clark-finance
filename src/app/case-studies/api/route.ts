export async function GET() {
  const response = await fetch(
    `${process.env.WP_ROUTE}/case-study?_fields=acf,slug,link`
  );
  const data = await response.json();

  return Response.json(data);
}
