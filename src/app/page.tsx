import { ContactUs } from '@/components/home/ContactUs';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ServiceCards } from '@/components/home/ServiceCards';
import { WhyClarkFinance } from '@/components/home/WhyClarkFinance';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { fetchContent } from '@/util/fetch';
import { ButtonContentFields } from '@/util/models';
import Image from 'next/image';

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

export default async function Home() {
  const data = await fetchContent({
    contentType: 'pages',
    slug: 'home',
  });

  const content: HomeContent = data[0].acf;

  console.log(content);

  return (
    <>
      <HeroBanner
        title={content.title}
        subtitle={content.subtitle}
        cta1={content.cta_1}
        cta2={content.cta_2}
      />
      <ServiceCards />
      <ContactUs
        title={content.contact_section_title}
        cta={content.book_appointment_label}
      />
      <WhyClarkFinance
        sectionTitle={content.why_clark_finance_section_title}
        bodyContent={content.about_us_content}
        aboutUsButton={content.about_us_cta}
      />
    </>
  );
}
