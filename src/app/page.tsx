import { ContactUs } from '@/components/home/ContactUs';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ServiceCards } from '@/components/home/ServiceCards';
import { Section } from '@/components/shared/Section';
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
      <Section type='narrow' classes='bg-building-detail bg-cover flex gap-12'>
        <div className='w-1/2 flex justify-end relative'>
          <Image
            src='/images/why-clark-finance-1.png'
            alt='photo of a business meeting'
            width={480}
            height={304}
          />
          <Image
            src='/images/why-clark-finance-2.png'
            alt='documents being signed'
            width={250}
            height={240}
            className='absolute top-44 left-0'
          />
        </div>
        <div className='w-1/2'>
          <h2 className='text-chalk'>
            {content.why_clark_finance_section_title}
          </h2>
        </div>
      </Section>
    </>
  );
}
