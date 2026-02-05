import { ContactUs } from '@/components/home/ContactUs';
import { Section } from '@/components/shared/Section';
import { GraphItem, YoastHeadJson } from '@/util/models';
import { convertWysywyg, replaceWpURL } from '@/util/utilFunctions';
import { Metadata } from 'next';

// Force dynamic rendering - fetch at request time instead of build time
// This prevents build failures if WordPress API is unavailable during build
export const dynamic = 'force-dynamic';

type ContactUsPageContent = {
  complaints_title: string;
  complaints_body: string;
};

async function fetchContactUsPageContent() {
  // Always fetch directly from WordPress in server components
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);
  const response = await fetch(
    `${process.env.WP_ROUTE}/pages/74?_fields=acf,yoast_head_json`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 86400,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from WordPress: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || '';
  const apiUrl = baseUrl ? `${baseUrl}/contact-us/api` : '/contact-us/api';
  const res = await fetch(apiUrl);

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
        classes='flex flex-col gap-8 bg-building-detail bg-cover px-4 py-8'
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
