import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ButtonContentFields } from '@/util/models';

type DecisionInPrincipleContent = {
  page_title: string;
  subheading: string;
  apply_text: string;
  apply_link: ButtonContentFields;
  docs_required_text: string;
  required_doc_1: string;
  required_doc_1_link: ButtonContentFields;
  required_doc_2: string;
  required_doc_2_link: ButtonContentFields;
  required_doc_3: string;
  required_doc_3_link: ButtonContentFields;
  required_doc_4: string;
  required_doc_4_link: ButtonContentFields;
  required_doc_5: string;
  required_doc_5_link: ButtonContentFields;
  required_doc_6: string;
  required_doc_6_link: ButtonContentFields;
  required_doc_7: string;
  required_doc_7_link: ButtonContentFields;
  required_doc_8: string;
  required_doc_8_link: ButtonContentFields;
};

async function fetchDecisionInPrinciplePageContent() {
  const res = await fetch(`${process.env.HOST_URL}/decision-in-principle/api`, {
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

export default async function DecisionInPrinciplePage() {
  const data = await fetchDecisionInPrinciplePageContent();

  const content: DecisionInPrincipleContent = data.acf;

  return (
    <>
      <Section type='narrow'>
        <SectionTitle
          title={content.page_title}
          textColour='ash'
          lineColour='mediumblue'
          alignment='centred'
        />
      </Section>
      <Section type='wide' classes='bg-chequered-bg flex'>
        <h2>{content.subheading}</h2>
      </Section>
    </>
  );
}
