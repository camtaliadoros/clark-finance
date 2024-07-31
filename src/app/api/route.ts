export async function GET() {
  const response = await fetch(
    `http://clark-finance.local/wp-json/wp/v2/pages?slug=home&_fields=acf`
  );
  const data = await response.json();

  return Response.json(data);
}
