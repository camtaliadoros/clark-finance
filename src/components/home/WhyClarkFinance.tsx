import Image from 'next/image';
import { Section } from '../shared/Section';
import { SectionTitle } from '../shared/SectionTitle';
import { ButtonContentFields } from '@/util/models';
import { Button } from '../shared/Button';
import { sanitiseURL } from '@/util/utilFunctions';

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

  // Sanitise URLs
  const sanitisedURL = sanitiseURL(aboutUsButton.url);

  return (
    <Section
      type='narrow'
      classes='bg-building-detail bg-cover flex items-start gap-12 md:py-40 flex flex-col md:flex-row'
    >
      <div className='w-full md:w-1/2 flex flex-col md:flex-row md:justify-end justify-start items-end md:items-start relative gap-16'>
        <Image
          src='/images/why-clark-finance-1.png'
          alt='photo of a business meeting'
          width={480}
          height={304}
          className='h-fit w-3/4'
        />
        <Image
          src='/images/why-clark-finance-2.png'
          alt='documents being signed'
          width={250}
          height={240}
          className='absolute top-24 md:top-20 lg:top-24 xl:top-52 right-44 md:right-36 lg:right-44 xl:right-72 w-1/2 lg:w-36 xl:w-64'
        />
      </div>
      <div className='w-full mt-28 md:mt-0 md:w-1/2 flex flex-col items-start '>
        <SectionTitle
          title={sectionTitle}
          lineColour='mediumblue'
          textColour='chalk'
          alignment='start'
          classes='mb-8'
        />
        <ul className='my-6 space-y-2'>
          {liArray?.map((item, i) => (
            <li key={i} className='flex items-center space-x-2'>
              <Image
                src='/images/check.png'
                width={15}
                height={15}
                alt='check icon'
              />
              <p className='text-chalk text-lg mb-0'>{item}</p>
            </li>
          ))}
        </ul>
        <Button colour='chalk' title={aboutUsButton.title} url={sanitisedURL} />
      </div>
    </Section>
  );
};
