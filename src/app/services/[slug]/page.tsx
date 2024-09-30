import { ImageTextBlock } from '@/components/shared/ImageTextBlock';
import { Section } from '@/components/shared/Section';
import { ImageType } from '@/util/models';
import { convertWysywyg, fetchFeaturedImage } from '@/util/utilFunctions';
import Image from 'next/image';

type PageProps = {
  params: Params;
};

type Params = {
  slug: string;
};

type PageContent = {
  image_text_block_2_title: string;
  image_text_block_2_content: string;
  image_text_block_2_image?: number | null;
  image_text_block_2_image_position: string;
  image_text_block_3_title: string;
  image_text_block_3_content: string;
  image_text_block_3_image?: number | null;
  image_text_block_3_image_position: string;
  image_text_block_1_title: string;
  image_text_block_1_content: string;
  image_text_block_1_image?: number | null;
  image_text_block_1_image_position: string;
  menu_location: string[];
  menu_position: number;
  page_title: string;
  subheading: string;
  service_title: string;
  text_block_1: string;
  text_block_2: string;
  page_title_background_image: number;
  homepage_order: number;
  why_clark_finance: string;
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

  const content: PageContent = data[0].acf;

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
            }[content.homepage_order]
          } bg-opacity-50`}
        ></div>

        <div className='flex flex-col bg-black bg-opacity-50 backdrop-blur h-full py-24 px-8 w-full lg:w-1/2 '>
          <h1 className='text-chalk'>{content.page_title}</h1>

          <h2 className='font-semibold text-xl text-chalk'>
            {content.subheading}
          </h2>
          <div
            className='text-chalk'
            dangerouslySetInnerHTML={{ __html: whyClarkFinanceText }}
          />
        </div>
      </div>
      <div className=''></div>
      <Section classes='flex flex-col items-center gap-32' type='narrow'>
        {content.image_text_block_1_image && (
          <ImageTextBlock
            image={content.image_text_block_1_image}
            title={content.image_text_block_1_title}
            text={content.image_text_block_1_content}
            position={content.image_text_block_1_image_position}
          />
        )}

        {textBlock1 && (
          <div
            className='text-ash lg:w-1/2 lg:text-center'
            dangerouslySetInnerHTML={{ __html: textBlock1 }}
          />
        )}
        {content.image_text_block_2_image && (
          <ImageTextBlock
            image={content.image_text_block_2_image}
            title={content.image_text_block_2_title}
            text={content.image_text_block_2_content}
            position={content.image_text_block_2_image_position}
          />
        )}
        {textBlock2 && (
          <div
            className='text-ash lg:w-1/2 lg:text-center'
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
    </>
  );
}
