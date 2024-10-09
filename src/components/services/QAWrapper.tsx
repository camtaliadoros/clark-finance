import { ServicePageContent } from '@/util/models';
import { Section } from '../shared/Section';
import { QA } from './QA';
import { SectionTitle } from '../shared/SectionTitle';

type QAProps = {
  pageContent: ServicePageContent;
};

type QAData = {
  q1?: string | undefined;
  a1?: string | undefined;
  q2?: string | undefined;
  a2?: string | undefined;
  q3?: string | undefined;
  a3?: string | undefined;
  q4?: string | undefined;
  a4?: string | undefined;
  q5?: string | undefined;
  a5?: string | undefined;
  q6?: string | undefined;
  a6?: string | undefined;
  q7?: string | undefined;
  a7?: string | undefined;
  q8?: string | undefined;
  a8?: string | undefined;
  q9?: string | undefined;
  a9?: string | undefined;
  q10?: string | undefined;
  a10?: string | undefined;
};

export const QAWrapper = ({ pageContent }: QAProps) => {
  // Isolate q&a content into array

  const data: QAData = {
    q1: pageContent.q1,
    a1: pageContent.a1,
    q2: pageContent.q2,
    a2: pageContent.a2,
    q3: pageContent.q3,
    a3: pageContent.a3,
    q4: pageContent.q4,
    a4: pageContent.a4,
    q5: pageContent.q5,
    a5: pageContent.a5,
    q6: pageContent.q6,
    a6: pageContent.a6,
    q7: pageContent.q7,
    a7: pageContent.a7,
    q8: pageContent.q8,
    a8: pageContent.a8,
    q9: pageContent.q9,
    a9: pageContent.a9,
    q10: pageContent.q10,
    a10: pageContent.a10,
  };

  const qaArr: Array<{
    order: number;
    q: string | undefined;
    a: string | undefined;
  }> = [];

  // Loop through the keys of the object in pairs
  for (let i = 1; i <= 10; i++) {
    if (data[`q${i}` as keyof QAData]) {
      const obj = {
        order: i,
        q: data[`q${i}` as keyof QAData],
        a: data[`a${i}` as keyof QAData],
      };

      qaArr.push(obj);
    }
  }

  // Sort qa array in ascending order

  qaArr.sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <Section
      type='wide'
      classes='bg-mediumblue flex flex-col items-center space-y-16'
      sectionId='#qa'
    >
      <SectionTitle
        title={`Your guide to ${pageContent.page_title}`}
        textColour='chalk'
        lineColour='chalk'
        alignment='centred'
      />

      <div id='qa' className='w-full md:w-2/3 lg:w-1/2 space-y-2'>
        {qaArr.map((qa) => (
          <QA question={qa.q} answer={qa.a} key={qa.order} />
        ))}
      </div>
    </Section>
  );
};
