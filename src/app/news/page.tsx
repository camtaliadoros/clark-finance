import { ContactUs } from '@/components/home/ContactUs';
import { ArticleListing } from '@/components/shared/ArticleListing';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { GraphItem, YoastHeadJson } from '@/util/models';
import { replaceWpURL } from '@/util/utilFunctions';
import { Metadata } from 'next';

// Enable ISR with 24-hour revalidation
export const revalidate = 86400;

type PageContent = {
  page_title: string;
  subheading: string;
};

async function fetchPageContent() {
  // Always fetch directly from WordPress in server components
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);
  const response = await fetch(
    `${process.env.WP_ROUTE}/pages/229?_fields=acf.page_title,acf.subheading,yoast_head_json`,
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
      title: 'News & Insights',
      description: 'Read our latest news and insights',
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

export default async function InsightsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const res = await fetchPageContent();

  // Validate that acf data exists
  if (!res || !res.acf) {
    throw new Error('Failed to fetch news page content: Invalid response structure');
  }

  const content: PageContent = res.acf;

  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Section
        type='narrow'
        classes='flex flex-col items-center justify-center bg-chequered-bg bg-cover bg-bottom lg:bg-fixed px-4 py-8'
      >
        <SectionTitle
          title={content.page_title}
          lineColour='mediumblue'
          textColour='ash'
          alignment='centred'
          classes='mb-12 md:mb-18 lg:mb-24'
          subheading={content.subheading}
        />
        <ArticleListing currentPage={currentPage} type='news' />
      </Section>
      <ContactUs colourScheme='dark' />
    </>
  );
}
