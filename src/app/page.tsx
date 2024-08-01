import { ContactUs } from '@/components/home/ContactUs';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ServiceCards } from '@/components/home/ServiceCards';
import { fetchContent } from '@/util/fetch';

export default async function Home() {
  const data = await fetchContent({ contentType: 'pages', slug: 'home' });

  return (
    <>
      <HeroBanner />
      <ServiceCards />
      <ContactUs />
    </>
  );
}
