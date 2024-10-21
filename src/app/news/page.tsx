import { ContactUs } from '@/components/home/ContactUs';
import { ArticleListing } from '@/components/shared/ArticleListing';
import { Pagination } from '@/components/shared/Pagination';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ArticleContentType, GraphItem, YoastHeadJson } from '@/util/models';
import { fetchPageMetadata, replaceWpURL } from '@/util/utilFunctions';
import { Metadata } from 'next';

type PageContent = {
  page_title: string;
  subheading: string;
};

async function fetchPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/news/api/fetchPageContent`,
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
  const res = await fetchPageContent();

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

  const content: PageContent = res.acf;

  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Section
        type='narrow'
        classes='flex flex-col items-center justify-center bg-chequered-bg bg-cover bg-bottom bg-fixed'
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
