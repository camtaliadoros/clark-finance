export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');

  const response = await fetch(
    `${process.env.WP_ROUTE}/${type}?slug=${slug}&_fields=acf`
  );
  const data = await response.json();

  return Response.json(data);
}
