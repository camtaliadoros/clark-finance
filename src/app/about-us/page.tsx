import { WhyChooseUsCard } from '@/components/aboutUs/WhyChooseUsCard';
import { ContactUs } from '@/components/home/ContactUs';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ImageType } from '@/util/models';
import { convertWysywyg, fetchFeaturedImage } from '@/util/utilFunctions';
import Image from 'next/image';

type AboutUsPageContent = {
  page_title: string;
  about_us_content: string;
  about_us_image: number;
  why_choose_us_title: string;
  why_choose_us_subheading: string;
  why_choose_us_icon_1: string | null;
  why_choose_us_item_title_1: string;
  why_choose_us_item_description_1: string;
  why_choose_us_item_note_1: string;
  why_choose_us_icon_2: string | null;
  why_choose_us_item_title_2: string;
  why_choose_us_item_description_2: string;
  why_choose_us_item_note_2: string | null;
  why_choose_us_icon_3: string | null;
  why_choose_us_item_title_3: string;
  why_choose_us_item_description_3: string;
  why_choose_us_item_note_3: string | null;
  why_choose_us_icon_4: string | null;
  why_choose_us_item_title_4: string;
  why_choose_us_item_description_4: string;
  why_choose_us_item_note_4: string | null;
  why_choose_us_icon_5: string | null;
  why_choose_us_item_title_5: string;
  why_choose_us_item_description_5: string;
  why_choose_us_item_note_5: string | null;
  why_choose_us_icon_6: string | null;
  why_choose_us_item_title_6: string;
  why_choose_us_item_description_6: string;
  why_choose_us_item_note_6: string | null;
};

export type WhyChooseUsItem = {
  why_choose_us_item_icon: string | number | null;
  why_choose_us_item_title: string;
  why_choose_us_item_description: string;
  why_choose_us_item_note: string | null;
};

async function fetchAboutUsPageContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/about-us/api`, {
    // next: {
    //   revalidate: 10,
    // },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function AboutUs() {
  const data = await fetchAboutUsPageContent();

  const content: AboutUsPageContent = data.acf;

  const bodyContent = convertWysywyg(content.about_us_content);

  const featuredImage: ImageType = await fetchFeaturedImage(
    content.about_us_image
  );

  // Organise 'Why Choose Us' Items into an array

  const whyChooseUsItems: WhyChooseUsItem[] = [];

  for (let i = 1; i <= 6; i++) {
    const iconKey = `why_choose_us_item_icon_${i}` as keyof AboutUsPageContent;
    const titleKey =
      `why_choose_us_item_title_${i}` as keyof AboutUsPageContent;
    const descriptionKey =
      `why_choose_us_item_description_${i}` as keyof AboutUsPageContent;
    const noteKey = `why_choose_us_item_note_${i}` as keyof AboutUsPageContent;

    const item: WhyChooseUsItem = {
      why_choose_us_item_icon: content[iconKey] as string | null,
      why_choose_us_item_title: content[titleKey] as string,
      why_choose_us_item_description: content[descriptionKey] as string,
      why_choose_us_item_note: content[noteKey] as string | null,
    };
    whyChooseUsItems.push(item);
  }

  return (
    <>
      <Section type='narrow'>
        <SectionTitle
          title={content.page_title}
          textColour='ash'
          lineColour='mediumblue'
          alignment='centred'
        />
        <div className='flex flex-col items-center lg:m-24 gap-12 md:gap-24 md:flex-row '>
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text}
            className='md:w-1/3'
            width={350}
            height={200}
          />
          <div
            className='md:w-2/3 text-sm'
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          ></div>
        </div>
      </Section>
      <Section type='wide' classes='bg-building-detail'>
        <SectionTitle
          title={content.why_choose_us_title}
          textColour='chalk'
          lineColour='chalk'
          alignment='centred'
        />
        <h4 className='text-chalk my-4 text-center text-lg font-semibold'>
          {content.why_choose_us_subheading}
        </h4>
        <div className='flex flex-wrap justify-center gap-12 my-12'>
          {whyChooseUsItems.map((content, i) => (
            <WhyChooseUsCard content={content} key={i} />
          ))}
        </div>
      </Section>
      <ContactUs colourScheme='light' />
    </>
  );
}
