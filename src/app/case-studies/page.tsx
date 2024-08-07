async function fetchAllCaseStudies() {
  const res = await fetch(`${process.env.HOST_URL}/case-studies/api`, {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function CaseStudiesHome() {}
