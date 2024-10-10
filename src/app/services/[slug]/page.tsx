import { ContactUs } from '@/components/home/ContactUs';
import { QAWrapper } from '@/components/services/QAWrapper';
import { BenefitCard } from '@/components/shared/BenefitCard';
import { Button } from '@/components/shared/Button';
import { ImageTextBlock } from '@/components/shared/ImageTextBlock';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import {
  BenefitItem,
  BenefitsBlock,
  ImageType,
  ServicePageContent,
} from '@/util/models';
import { convertWysywyg, fetchFeaturedImage } from '@/util/utilFunctions';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

type PageProps = {
  params: Params;
};

type Params = {
  slug: string;
};

const fetchPageContent = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/services/api/fetchServicePageContent?slug=${slug}`,
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
};

export default async function Service({ params }: PageProps) {
  const data = await fetchPageContent(params.slug);

  const content: ServicePageContent = data[0].acf;

  const bgImage: ImageType = await fetchFeaturedImage(
    content.page_title_background_image
  );

  const whyClarkFinanceText = convertWysywyg(content.why_clark_finance);

  let textBlock1;
  if (content.text_block_1) {
    textBlock1 = convertWysywyg(content.text_block_1);
  }

  let textBlock2;
  if (content.text_block_2) {
    textBlock2 = convertWysywyg(content.text_block_2);
  }

  const lendersContent = convertWysywyg(content.lenders);

  const benefitsArr: BenefitItem[] = [];

  for (let i = 1; i <= 6; i++) {
    const iconKey = `icon_${i}` as keyof BenefitsBlock;
    const titleKey = `title_${i}` as keyof BenefitsBlock;
    const textKey = `text_${i}` as keyof BenefitsBlock;

    const item: BenefitItem = {
      icon: content.benefits_block[iconKey] as number,
      title: content.benefits_block[titleKey] as string,
      description: content.benefits_block[textKey] as string,
    };
    benefitsArr.push(item);
  }

  return (
    <>
      <div
        className='relative flex md:px-24 items-center bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: `url(${bgImage.source_url})`,
        }}
      >
        <div
          className={`absolute inset-0  ${
            {
              1: 'bg-green',
              2: 'bg-yellow',
              3: 'bg-orange',
              4: 'bg-purple',
              5: 'bg-magenta',
              6: 'bg-navy',
              7: 'bg-red',
              8: 'bg-bluegrey',
            }[content.service_card.homepage_order]
          } bg-opacity-50`}
        ></div>

        <div className='flex flex-col bg-black bg-opacity-50 backdrop-blur h-full py-24 px-8 w-full lg:w-1/2 gap-8 '>
          <div className='flex flex-col'>
            <h1 className='text-chalk mb-8'>{content.page_title}</h1>

            <h2 className='font-semibold text-xl text-chalk'>
              {content.subheading}
            </h2>
            <div
              className='text-chalk'
              dangerouslySetInnerHTML={{ __html: whyClarkFinanceText }}
            />
          </div>
          <div className='flex gap-8'>
            <Button url='#contact-us' title='Get in touch' colour='chalk' />
          </div>
        </div>
      </div>
      <div className='flex w-screen md:w-fit'>
        {content.q1 && (
          <Link
            className={`flex gap-2 items-center py-2 px-4 no-underline border-r border-chalk w-full min-w-fit ${
              {
                1: 'bg-green',
                2: 'bg-yellow',
                3: 'bg-orange',
                4: 'bg-purple',
                5: 'bg-magenta',
                6: 'bg-navy',
                7: 'bg-red',
                8: 'bg-bluegrey',
              }[content.service_card.homepage_order]
            } hover:bg-opacity-80 transition text-chalk font-semibold text-sm`}
            href='#qa'
          >
            View our mortgage guide
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className='text-base'
            />
          </Link>
        )}
        {lendersContent && (
          <Link
            href='#lenders'
            className={`flex gap-2 items-center py-2 px-4 no-underline border-r border-chalk w-full min-w-fit ${
              {
                1: 'bg-green',
                2: 'bg-yellow',
                3: 'bg-orange',
                4: 'bg-purple',
                5: 'bg-magenta',
                6: 'bg-navy',
                7: 'bg-red',
                8: 'bg-bluegrey',
              }[content.service_card.homepage_order]
            } hover:bg-opacity-80 transition text-chalk font-semibold text-sm`}
          >
            View our lenders
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className='text-base'
            />
          </Link>
        )}
      </div>
      <Section classes='flex flex-col items-center gap-24' type='wide'>
        {content.image_text_block_1_image && (
          <ImageTextBlock
            image={content.image_text_block_1_image}
            title={content.image_text_block_1_title}
            text={content.image_text_block_1_content}
            position={content.image_text_block_1_image_position}
          />
        )}

        {content.benefits_block_is_available && (
          <div className='bg-chequered-bg bg-cover  bg-bottom flex flex-wrap justify-center gap-12 pb-24 p-1 md:p-0'>
            {benefitsArr.map((content, i) => (
              <BenefitCard content={content} key={i} colourScheme='light' />
            ))}
          </div>
        )}

        {textBlock1 && (
          <div
            className='text-ash lg:w-1/2 lg:text-left'
            dangerouslySetInnerHTML={{ __html: textBlock1 }}
          />
        )}
        {content.image_text_block_2_content && (
          <ImageTextBlock
            image={content.image_text_block_2_image}
            title={content.image_text_block_2_title}
            text={content.image_text_block_2_content}
            position={content.image_text_block_2_image_position}
          />
        )}
        {textBlock2 && (
          <div
            className='text-ash lg:w-1/2 lg:text-left'
            dangerouslySetInnerHTML={{ __html: textBlock2 }}
          />
        )}
        {content.image_text_block_3_image && (
          <ImageTextBlock
            image={content.image_text_block_3_image}
            title={content.image_text_block_3_title}
            text={content.image_text_block_3_content}
            position={content.image_text_block_3_image_position}
          />
        )}
      </Section>

      {content.q1 && <QAWrapper pageContent={content} />}
      {lendersContent && (
        <Section
          type='narrow'
          classes='bg-chequered-bg bg-cover bg-bottom flex flex-col items-center gap-16'
        >
          <SectionTitle
            title='Lenders we work with'
            textColour='ash'
            lineColour='mediumblue'
            alignment='centred'
          />
          <div
            id='lenders'
            className='flex flex-row flex-wrap gap-8 justify-center'
            dangerouslySetInnerHTML={{ __html: lendersContent }}
          />
        </Section>
      )}
      <ContactUs colourScheme='dark' />
    </>
  );
}
