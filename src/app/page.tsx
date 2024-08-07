import { HeroBanner } from '@/components/home/HeroBanner';
import { fetchContent } from '@/util/fetch';

export default async function Home() {
  const data = await fetchContent({ contentType: 'pages', slug: 'home' });

  return (
    <>
      <HeroBanner />
    </>
  );
}
