export async function GET() {
  try {
    console.log('@@@%^@%@%&@%^&@%');
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages/215?_fields=acf`
    );
    const data = await response.json();

    return Response.json(data);
  } catch (e) {
    throw new Error('There was a problem retrieving the content: ' + e);
  }
}
