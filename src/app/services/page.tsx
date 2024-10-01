import { ServiceCards } from '@/components/home/ServiceCards';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';

type ServicesPageContent = {
  page_title: string;
  subheading: string;
};

async function fetchPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/services/api/fetchPageContent`,
    {
      // next: {
      //   revalidate: 10,
      // },
      cache: 'no-store',
    }
  );

  const resJson = await res.json();

  const data = resJson.acf;

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return data;
}

export default async function Services() {
  const content: ServicesPageContent = await fetchPageContent();

  return (
    <>
      <div
        className='space-y-4 mb-0 pb-0 bg-hero-image bg-top bg-cover bg-fixed flex flex-col items-center justify-center'
        style={{ height: '32rem' }}
      >
        <SectionTitle
          title={content.page_title}
          lineColour='chalk'
          textColour='chalk'
          alignment='centred'
        />
        <h2 className='text-center text-xl font-semibold text-chalk'>
          {content.subheading}
        </h2>
      </div>

      <ServiceCards />
    </>
  );
}
