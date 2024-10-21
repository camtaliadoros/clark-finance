'use-client';

import { ContactUs } from '@/components/home/ContactUs';
import { Section } from '@/components/shared/Section';
import { GraphItem, YoastHeadJson } from '@/util/models';
import { convertWysywyg, replaceWpURL } from '@/util/utilFunctions';
import { Metadata } from 'next';

type ContactUsPageContent = {
  complaints_title: string;
  complaints_body: string;
};

async function fetchContactUsPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/contact-us/api`,
    {
      // next: {
      //   revalidate: 86400,
      // },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/contact-us/api`);

  const data = await res.json();

  const metadata: YoastHeadJson = data.yoast_head_json;

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

export default async function ContactUsPage() {
  const data = await fetchContactUsPageContent();
  const content: ContactUsPageContent = data.acf;

  const complaintsBody = convertWysywyg(content.complaints_body);

  return (
    <>
      <ContactUs colourScheme='light' />
      <Section
        type='narrow'
        classes='flex flex-col gap-8 bg-building-detail bg-cover'
      >
        <h2 className='text-chalk text-xl 2xl:text-3xl'>
          {content.complaints_title}
        </h2>
        <div
          className='text-chalk text-sm 2xl:text-xl'
          dangerouslySetInnerHTML={{ __html: complaintsBody }}
        />
      </Section>
    </>
  );
}
