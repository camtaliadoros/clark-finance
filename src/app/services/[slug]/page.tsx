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

  let image: ImageType = null;
  if (content.image_text_block_1_image) {
    image = await fetchFeaturedImage(content.image_text_block_1_image);
  }

  console.log(content);

  const text = convertWysywyg(content.image_text_block_1_content);

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

  return (
    <>
      <Section type='narrow'>
        <SectionTitle
          title={content.page_title}
          lineColour='mediumblue'
          textColour='ash'
          alignment='centred'
          classes='mb-4'
        />
        <h2 className='text-center font-semibold text-xl text-ash'>
          {content.subheading}
        </h2>
      </Section>
      <Section type='narrow flex flex-col md:flex-row'>
        {image.source_url && (
          <Image src={image.source_url} alt='' className='w-1/2' />
        )}
        <div className='w-1/2' dangerouslySetInnerHTML={{ __html: text }} />
      </Section>
    </>
  );
}
