import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
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

  const text = convertWysywyg(content.image_text_block_1_content);

  const whyClarkFinanceText = convertWysywyg(content.why_clark_finance);

  let image;

  if (content.image_text_block_1_image) {
    image = await fetchFeaturedImage(content.image_text_block_1_image);
  }

  const imageUrls = {};

  // // Loop?
  // if (content.image_text_block_1_image) {
  //   const image: ImageType = await fetchFeaturedImage(
  //     content.image_text_block_1_image
  //   );
  //   imageUrls[1] = image;
  // }

  // if (content.image_text_block_2_image) {
  //   const image: ImageType = await fetchFeaturedImage(
  //     content.image_text_block_2_image
  //   );
  //   imageUrls[2] = image;
  // }

  // if (content.image_text_block_3_image) {
  //   const image: ImageType = await fetchFeaturedImage(
  //     content.image_text_block_3_image
  //   );
  //   imageUrls[3] = image;
  // }

  // const textBlocks = {};
  // if (content.image_text_block_1_content) {
  //   const text = convertWysywyg(content.image_text_block_1_content);
  //   textBlocks[1] = text;
  // }

  // if (content.image_text_block_2_content) {
  //   const text = convertWysywyg(content.image_text_block_2_content);
  //   textBlocks[2] = text;
  // }

  // if (content.image_text_block_3_content) {
  //   const text = convertWysywyg(content.image_text_block_3_content);
  //   textBlocks[3] = text;
  // }

  console.log(content);

  return (
    <>
      <div
        className='relative flex px-24 items-center bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: `url(${bgImage.source_url})`,
        }}
      >
        <div
          className={`absolute inset-0 ${
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

        <div className='flex flex-col bg-black bg-opacity-50 backdrop-blur h-full py-24 px-8 w-1/2 '>
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

      <Section classes='narrow flex flex-col md:flex-row gap-16' type='narrow'>
        {image.source_url && (
          <Image
            src={image.source_url}
            alt=''
            className='w-1/2'
            width={500}
            height={500}
          />
        )}
        <div className='flex flex-col w-1/2 space-y-8'>
          {content.image_text_block_1_title && (
            <h2 className='font-semibold'>
              {content.image_text_block_1_title}
            </h2>
          )}
          <div
            className='text-ash'
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </Section>
    </>
  );
}
