export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const response = await fetch(`${process.env.WP_ROUTE}/article?_fields=slug`, {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  const totalPages = response.headers.get('X-WP-TotalPages');

  const articlesData = {
    pageData: data,
    totalPages: totalPages,
  };

  return Response.json(articlesData);
}
