export async function GET() {
  const response = await fetch(
    `${process.env.WP_ROUTE}/case-study?_fields=acf,slug,link`
  );
  const data = await response.json();

  const contentRes = await fetch(
    `${process.env.WP_ROUTE}/pages/203?_fields=acf`
  );

  const contentData = await contentRes.json();

  const caseStudiesPageData = {
    content: contentData,
    caseStudiesData: data,
  };

  return Response.json(caseStudiesPageData);
}
