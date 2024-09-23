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
  title: string;
  content: string;
  image: number;
  image_position: string;
  available: boolean;
  menu_location: string[];
  menu_position: number;
  page_title: string;
  subheading: string;
  service_title: string;
  service_excerpt: string;
  homepage_order: number;
  text_block: string;
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

  console.log(content);

  const image1: ImageType = await fetchFeaturedImage(content.image);

  const textBlock1 = convertWysywyg(content.content);

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
        <Image src={image1.source_url} alt='' className='w-1/2' />
        <div
          className='w-1/2'
          dangerouslySetInnerHTML={{ __html: textBlock1 }}
        />
      </Section>
    </>
  );
}
