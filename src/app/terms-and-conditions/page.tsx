import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { convertWysywyg } from '@/util/utilFunctions';

type TcsPageContent = {
  page_title: string;
  content: string;
};

async function fetchTCsPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/terms-and-conditions/api`,
    {
      // next: {
      //   revalidate: 10,
      // },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function TermsAndConditions() {
  const data = await fetchTCsPageContent();

  const content: TcsPageContent = data.acf;

  const bodyContent = convertWysywyg(content.content);

  return (
    <Section type='narrow'>
      <SectionTitle
        title={content.page_title}
        lineColour='mediumblue'
        textColour='ash'
        alignment='centred'
      />
      <div
        className='text-ash text-center mx-36 my-12'
        dangerouslySetInnerHTML={{ __html: bodyContent }}
      ></div>
    </Section>
  );
}
