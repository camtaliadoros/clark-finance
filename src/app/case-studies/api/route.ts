export async function GET() {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/case-study?_fields=acf,slug,link`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    const contentRes = await fetch(
      `${process.env.WP_ROUTE}/pages/203?_fields=acf`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const contentData = await contentRes.json();

    const caseStudiesPageData = {
      content: contentData,
      caseStudiesData: data,
    };

    return Response.json(caseStudiesPageData);
  } catch (e) {
    throw new Error('There was a problem retrieving the content: ' + e);
  }
}
