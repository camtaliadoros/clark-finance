async function fetchContent() {
  const res = await fetch(`${process.env.HOST_URL}/api`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const data = await fetchContent();

  console.log(data);
  return <p>Home</p>;
}
