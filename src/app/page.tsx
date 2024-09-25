import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { ContactUs } from '@/components/home/ContactUs';
import { HeroBanner } from '@/components/home/HeroBanner';
import { Reviews } from '@/components/home/Reviews';
import { ServiceCards } from '@/components/home/ServiceCards';
import { WhyClarkFinance } from '@/components/home/WhyClarkFinance';
import { fetchContent } from '@/util/fetch';
import { ButtonContentFields } from '@/util/models';

type HomeContent = {
  contact_section_title: string;
  book_appointment_label: ButtonContentFields;
  title: string;
  subtitle: string;
  cta_1: ButtonContentFields;
  cta_2: ButtonContentFields;
  why_clark_finance_section_title: string;
  about_us_content: string;
  about_us_cta: ButtonContentFields;
};

async function fetchHomePageContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api`, {
    // next: {
    //   revalidate: 10,
    // },
    cache: 'no-store',
  });

  if (!res.ok) {
    const a = await res.json();

    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const data = await fetchHomePageContent();

  const content: HomeContent = data.acf;

  return (
    <>
      <HeroBanner
        title={content.title}
        subtitle={content.subtitle}
        cta1={content.cta_1}
        cta2={content.cta_2}
      />
      <ServiceCards classes='bg-chalk' />
      <ContactUs colourScheme='light' />
      <WhyClarkFinance
        sectionTitle={content.why_clark_finance_section_title}
        bodyContent={content.about_us_content}
        aboutUsButton={content.about_us_cta}
      />
      <CaseStudiesSection bgColour='light' />
      <Reviews />
    </>
  );
}
