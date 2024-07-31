type fetchContentParams = {
  contentType: string;
  slug: string;
};

export async function fetchContent({ contentType, slug }: fetchContentParams) {
  const res = await fetch(
    `${process.env.HOST_URL}/api?type=${contentType}&slug=${slug}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
