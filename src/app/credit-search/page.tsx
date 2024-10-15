import { Button } from '@/components/shared/Button';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ButtonContentFields } from '@/util/models';
import { convertWysywyg } from '@/util/utilFunctions';

type CreditSearchContent = {
  button: ButtonContentFields;
  page_content: string;
  page_title: string;
  subheading: string;
};

async function fetchCreditSearchContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/credit-search/api`,
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

export default async function CreditSearchPage() {
  const data = await fetchCreditSearchContent();

  const content: CreditSearchContent = data.acf;

  const bodyContent = convertWysywyg(content.page_content);

  return (
    <Section
      type='narrow'
      classes='bg-chequered-bg bg-cover bg-bottom flex flex-col items-center'
    >
      <SectionTitle
        title={content.page_title}
        textColour='ash'
        lineColour='mediumblue'
        alignment='centred'
        subheading={content.subheading}
      />
      <div
        className='md:w-2/3 my-16'
        dangerouslySetInnerHTML={{ __html: bodyContent }}
      />
      <Button
        colour='mediumblue'
        title={content.button.title}
        url={content.button.url}
        target={content.button.target}
      />
    </Section>
  );
}
