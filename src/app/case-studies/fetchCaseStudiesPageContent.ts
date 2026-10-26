import { notFound } from 'next/navigation';

// While the Case Studies page is unpublished in WordPress, the API returns an
// error instead of content. Treat that as the section being switched off and
// show the 404 page for /case-studies and every case study.
export async function fetchCaseStudiesPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/case-studies/api/fetchPageContent`,
    {
      next: {
        revalidate: 86400,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  if (!data.acf || !data.yoast_head_json) {
    notFound();
  }
  return data;
}
