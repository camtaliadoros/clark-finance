'use-client';

import { ContactUs } from '@/components/home/ContactUs';
import { Section } from '@/components/shared/Section';
import { convertWysywyg } from '@/util/utilFunctions';

type ContactUsPageContent = {
  complaints_title: string;
  complaints_body: string;
};

async function fetchContactUsPageContent() {
  const res = await fetch(`${process.env.HOST_URL}/contact-us/api`, {
    // next: {
    //   revalidate: 10,
    // },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function ContactUsPage() {
  const data = await fetchContactUsPageContent();
  const content: ContactUsPageContent = data.acf;

  const complaintsBody = convertWysywyg(content.complaints_body);

  return (
    <>
      <ContactUs />
      <Section type='narrow' classes='flex flex-col gap-8 bg-building-detail'>
        <h2 className='text-chalk'>{content.complaints_title}</h2>
        <div
          className='text-chalk'
          dangerouslySetInnerHTML={{ __html: complaintsBody }}
        />
      </Section>
    </>
  );
}
