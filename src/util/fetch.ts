type fetchContentParams = {
  contentType: string;
  slug: string;
};

export async function fetchContent({ contentType, slug }: fetchContentParams) {
  const res = await fetch(
    `http://localhost:3000/api?type=${contentType}&slug=${slug}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
