export async function GET() {
  const response = await fetch(
    `${process.env.WP_ROUTE}/article?_fields=acf,date,slug`,
    {}
  );

  const data = await response.json();

  return Response.json(data);
}
