import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { convertWysywyg } from '@/util/utilFunctions';

type TcsPageContent = {
  page_title: string;
  subheading: string | undefined;
  content: string;
};

async function fetchTCsPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/terms-and-conditions/api`,
    {
      next: {
        revalidate: 86400,
      },
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
        subheading={content.subheading}
      />
      <div
        className='text-ash text-center mx-36 my-12'
        dangerouslySetInnerHTML={{ __html: bodyContent }}
      ></div>
    </Section>
  );
}
