import { ContactUs } from '@/components/home/ContactUs';
import { BenefitCard } from '@/components/shared/BenefitCard';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import {
  BenefitItem,
  GraphItem,
  ImageType,
  YoastHeadJson,
} from '@/util/models';
import {
  convertWysywyg,
  fetchFeaturedImage,
  fetchPageMetadata,
  replaceWpURL,
} from '@/util/utilFunctions';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';

type AboutUsPageContent = {
  page_title: string;
  subheading: string;
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

async function fetchAboutUsPageContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/about-us/api`, {
    // next: {
    //   revalidate: 86400,
    // },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetchPageMetadata(88);

  const metadata: YoastHeadJson = res.yoast_head_json;

  const title = metadata.title;
  const description = metadata.schema['@graph'].find(
    (item: GraphItem) => item['@type'] === 'WebSite'
  )?.description;
  const canonical = replaceWpURL(metadata.canonical);
  const robots = metadata.robots;
  const ogTitle = metadata.og_title;
  const ogUrl = replaceWpURL(metadata.og_url);
  const ogSiteName = metadata.og_site_name;
  const ogLocale = metadata.og_locale;
  const twitterCard = metadata.twitter_card;
  const logo = metadata.schema['@graph'].find(
    (item: GraphItem) => item['@type'] === 'Organization'
  )?.logo;
  const imagePreviewType = robots['max-image-preview'].replace(
    'max-image-preview:',
    ''
  ) as 'none' | 'standard' | 'large' | undefined;

  return {
    title: title,
    description: description,
    robots: {
      index: robots.index === 'index',
      follow: robots.follow === 'follow',
      'max-snippet': Number(robots['max-snippet'].replace('max-snippet:', '')),
      'max-image-preview': imagePreviewType,
      'max-video-preview': Number(
        robots['max-video-preview'].replace('max-video-preview:', '')
      ),
    },
    openGraph: {
      type: 'website',
      title: ogTitle,
      url: ogUrl,
      siteName: ogSiteName,
      locale: ogLocale,
      images: [
        {
          url:
            logo?.url ||
            'https://clarkfinance.wordifysites.com/wp-content/uploads/2024/10/Clark-Finance-Logo-High-Quality.png',
          width: logo?.width,
          height: logo?.height,
          alt: 'Clark Finance',
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: description,
      images:
        'https://clarkfinance.wordifysites.com/wp-content/uploads/2024/10/Clark-Finance-Logo-High-Quality.png',
    },
    alternates: {
      canonical: canonical,
    },
  };
}

export default async function AboutUs() {
  const data = await fetchAboutUsPageContent();

  const content: AboutUsPageContent = data.acf;

  const bodyContent = convertWysywyg(content.about_us_content);

  const featuredImage: ImageType = await fetchFeaturedImage(
    content.about_us_image
  );

  // Organise 'Why Choose Us' Items into an array

  const whyChooseUsItems: BenefitItem[] = [];

  for (let i = 1; i <= 6; i++) {
    const iconKey = `why_choose_us_item_icon_${i}` as keyof AboutUsPageContent;
    const titleKey =
      `why_choose_us_item_title_${i}` as keyof AboutUsPageContent;
    const descriptionKey =
      `why_choose_us_item_description_${i}` as keyof AboutUsPageContent;
    const noteKey = `why_choose_us_item_note_${i}` as keyof AboutUsPageContent;

    const item: BenefitItem = {
      icon: content[iconKey] as number,
      title: content[titleKey] as string,
      description: content[descriptionKey] as string,
      note: content[noteKey] as string | null,
    };
    whyChooseUsItems.push(item);
  }

  return (
    <>
      <Section type='narrow'>
        <SectionTitle
          title={content.page_title}
          subheading={content.subheading}
          textColour='ash'
          lineColour='mediumblue'
          alignment='centred'
          classes='mb-16'
        />
        <div className='flex flex-col items-center lg:m-24 gap-12 md:gap-24 md:flex-row '>
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text}
            className='md:w-1/3'
            width={350}
            height={200}
            unoptimized
          />

          <div
            className='md:w-2/3 text-sm 2xl:text-xl'
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          ></div>
        </div>
      </Section>
      <Section type='wide' classes='bg-building-detail bg-cover'>
        <SectionTitle
          title={content.why_choose_us_title}
          textColour='chalk'
          lineColour='chalk'
          alignment='centred'
          classes='mb-0'
        />
        <h4 className='text-chalk my-4 2xl:my-12 text-center text-lg 2xl:text-2xl font-semibold'>
          {content.why_choose_us_subheading}
        </h4>
        <div className='grid grid-cols-2 md:grid-cols-3 justify-center gap-12 '>
          {whyChooseUsItems.map((content, i) => (
            <BenefitCard content={content} key={i} colourScheme='dark' />
          ))}
        </div>
      </Section>
      <ContactUs colourScheme='light' />
    </>
  );
}
