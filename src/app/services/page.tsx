import { ServiceCards } from '@/components/home/ServiceCards';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { GraphItem, YoastHeadJson } from '@/util/models';
import { replaceWpURL } from '@/util/utilFunctions';
import { Metadata } from 'next';

// Force dynamic rendering - fetch at request time instead of build time
// This prevents build failures if WordPress API is unavailable during build
export const dynamic = 'force-dynamic';

type ServicesPageContent = {
  page_title: string;
  subheading: string;
};

async function fetchPageContent() {
  // Always fetch directly from WordPress in server components
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);
  const response = await fetch(
    `${process.env.WP_ROUTE}/pages/249?_fields=acf,yoast_head_json`,
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
  const res = await fetchPageContent();

  // Validate that metadata exists
  if (!res || !res.yoast_head_json) {
    return {
      title: 'Services',
      description: 'Our services',
    };
  }

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

export default async function Services() {
  const res = await fetchPageContent();

  // Validate that acf data exists
  if (!res || !res.acf) {
    throw new Error('Failed to fetch services page content: Invalid response structure');
  }

  const content: ServicesPageContent = res.acf;

  return (
    <>
      <div
        className='space-y-4 mb-0 pb-0 bg-hero-image bg-top bg-cover lg:bg-fixed flex flex-col items-center py-32'
        style={{ height: '24rem' }}
      >
        <SectionTitle
          title={content.page_title}
          lineColour='chalk'
          textColour='chalk'
          alignment='centred'
          subheading={content.subheading}
        />
      </div>

      <ServiceCards />
    </>
  );
}
