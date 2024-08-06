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
    <Section
      type='narrow'
      classes='bg-building-detail bg-cover flex items-end gap-12 md:py-40 flex flex-col md:flex-row'
    >
      <div className='w-4/5 md:w-1/2 flex md:justify-end relative '>
        <Image
          src='/images/why-clark-finance-1.png'
          alt='photo of a business meeting'
          width={480}
          height={304}
          className='h-fit'
        />
        <Image
          src='/images/why-clark-finance-2.png'
          alt='documents being signed'
          width={250}
          height={240}
          className='absolute top-20 md:top-44 -left-12 md:left-0 w-1/2'
        />
      </div>
      <div className='w-full md:w-1/2 ml-16 flex flex-col items-start '>
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
