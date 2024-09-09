export async function GET() {
  const response = await fetch(`${process.env.WP_ROUTE}/pages/154?_fields=acf`);

  const data = await response.json();

  return Response.json(data);
}
