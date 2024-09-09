import { RequiredDocsItemCard } from '@/components/decisionInPrinciple/RequiredDocsCard';
import { ContactUs } from '@/components/home/ContactUs';
import { Button } from '@/components/shared/Button';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ButtonContentFields } from '@/util/models';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

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

export type RequiredDocsItem = {
  required_doc_title: string;
  required_doc_link: ButtonContentFields | null;
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

  // Organise 'Why Choose Us' Items into an array

  const requiredDocumentsItems: RequiredDocsItem[] = [];

  for (let i = 1; i <= 8; i++) {
    const title = `required_doc_${i}` as keyof DecisionInPrincipleContent;
    const link = `required_doc_${i}_link` as keyof DecisionInPrincipleContent;

    const item: RequiredDocsItem = {
      required_doc_title: content[title] as string,
      required_doc_link: content[link] as ButtonContentFields | null,
    };
    requiredDocumentsItems.push(item);
  }

  return (
    <>
      <Section
        type='narrow'
        classes='bg-houses bg-cover bg-bottom bg-fixed flex flex-col items-center'
      >
        <SectionTitle
          title={content.page_title}
          textColour='chalk'
          lineColour='chalk'
          alignment='centred'
        />
        <h3 className='font-semibold text-center my-4 text-chalk'>
          {content.subheading}
        </h3>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center my-16  mb-24 md:mb-32 space-y-8'>
          <Button
            colour='chalk'
            title={content.apply_link.title}
            url={content.apply_link.url}
            target={content.apply_link.target}
          />
          <div className='flex flex-col md:w-1/3 md:items-end space-y-4'>
            <h4 className='text-chalk text-2xl text-right'>
              Speak to our Experts today to run through your application
            </h4>
            <Link
              href='tel:+4420451​82215 flex'
              className='text-chalk flex items-center'
            >
              <FontAwesomeIcon
                icon={faPhone}
                size='xs'
                className='text-chalk text-xs w-6 h-6 mr-2 hover:no-underline'
              />
              <p className='text-2xl'>0204 51​8 2215</p>
            </Link>
          </div>
        </div>

        <div className='bg-chalk flex flex-col items-center space-y-8 p-8 md:p-16  rounded-md w-full lg:w-4/5 '>
          <h2 className='font-semibold text-ash mb-12 text-2xl md:text-4xl'>
            {content.docs_required_text}
          </h2>
          <div className='flex flex-col justify-start space-y-8 lg:w-4/5'>
            {requiredDocumentsItems.map((item, i) => (
              <RequiredDocsItemCard content={item} key={i} />
            ))}
          </div>
        </div>
      </Section>
      <ContactUs />
    </>
  );
}
