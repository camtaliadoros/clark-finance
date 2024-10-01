import { ServicePageContent } from '@/util/models';
import { Section } from '../shared/Section';
import { QA } from './QA';
import { SectionTitle } from '../shared/SectionTitle';

type QAProps = {
  pageContent: ServicePageContent;
};

type QAContent = {
  order: number;
  q: string;
  a: string;
};

export const QAWrapper = ({ pageContent }: QAProps) => {
  // Isolate q&a content into array

  const data = {
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

  const qaArr: QAContent[] = [];

  // Loop through the keys of the object in pairs
  for (let i = 1; i <= Object.keys(data).length / 2; i++) {
    const obj = {};

    if (data[`q${i}`]) {
      obj['order'] = i;
      obj[`q`] = data[`q${i}`];
      obj[`a`] = data[`a${i}`];

      qaArr.push(obj);
    }
  }

  // Sort qa array in ascending order
  const orderedQA: QAContent[] = qaArr.sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <Section
      type='wide'
      classes='bg-mediumblue flex flex-col items-center space-y-16'
    >
      <SectionTitle
        title={`Your guide to ${pageContent.service_title}`}
        textColour='chalk'
        lineColour='chalk'
        alignment='centred'
      />

      <div id='qa' className='w-full md:w-2/3 lg:w-1/2 space-y-2'>
        {orderedQA.map((qa) => (
          <QA question={qa.q} answer={qa.a} key={qa.order} />
        ))}
      </div>
    </Section>
  );
};
