import Image from 'next/image';
import { Section } from '../shared/Section';
import { SectionTitle } from '../shared/SectionTitle';
import { ButtonContentFields } from '@/util/models';
import { Button } from '../shared/Button';

type WhyClarkFinanceContent = {
  sectionTitle: string;
  bodyContent: string;
  aboutUsButton: ButtonContentFields;
};

export const WhyClarkFinance = ({
  sectionTitle,
  bodyContent,
  aboutUsButton,
}: WhyClarkFinanceContent) => {
  //Remove the surrounding <ul> tags
  const listContent = bodyContent.replace(/<\/?ul>/g, '');

  // Extract the content of each <li> tag
  const listItems = listContent.match(/<li>(.*?)<\/li>/g);

  // Remove the <li> tags and clean up the content
  const liArray = listItems?.map((item) => item.replace(/<\/?li>/g, '').trim());

  return (
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
      <div className='w-1/2 ml-16 flex flex-col items-start'>
        <SectionTitle title={sectionTitle} colour='mediumblue' />
        <ul className='my-6 space-y-2'>
          {liArray?.map((item, i) => (
            <li key={i} className='flex items-center space-x-2'>
              <Image
                src='/images/check.png'
                width={15}
                height={15}
                alt='check icon'
              />
              <p className='text-chalk text-lg'>{item}</p>
            </li>
          ))}
        </ul>
        <Button
          colour='chalk'
          title={aboutUsButton.title}
          url={aboutUsButton.url}
        />
      </div>
    </Section>
  );
};
