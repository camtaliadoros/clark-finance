import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ServiceCards } from '@/components/home/ServiceCards';
import { WhyClarkFinance } from '@/components/home/WhyClarkFinance';
import { ButtonContentFields, GraphItem, YoastHeadJson } from '@/util/models';
import { replaceWpURL } from '@/util/utilFunctions';
import { Metadata } from 'next/types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load below-the-fold components to reduce initial bundle size
const ContactUs = dynamic(() => import('@/components/home/ContactUs').then(mod => ({ default: mod.ContactUs })), {
  loading: () => <div className="min-h-[400px]" />,
});

const Reviews = dynamic(() => import('@/components/home/Reviews').then(mod => ({ default: mod.Reviews })), {
  loading: () => <div className="min-h-[400px]" />,
});

// Force dynamic rendering - fetch at request time instead of build time
// This prevents build failures if WordPress API is unavailable during build
export const dynamic = 'force-dynamic';

type HomeContent = {
  contact_section_title: string;
  book_appointment_label: ButtonContentFields;
  title: string;
  subtitle: string;
  cta_1: ButtonContentFields;
  cta_2: ButtonContentFields;
  why_clark_finance_section_title: string;
  about_us_content: string;
  about_us_cta: ButtonContentFields;
};

async function fetchHomePageContent() {
  // Always fetch directly from WordPress in server components
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);
  const response = await fetch(
    `${process.env.WP_ROUTE}/pages/7?_fields=acf,yoast_head_json`,
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
  // Fetch directly from WordPress - only fetch metadata fields to minimize payload
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);
  try {
    const response = await fetch(
      `${process.env.WP_ROUTE}/pages/7?_fields=yoast_head_json`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
        // Use shorter cache for metadata to improve response time
        next: {
          revalidate: 3600, // 1 hour instead of 24 hours for faster updates
        },
      }
    );
    
    if (!response.ok) {
      // Fallback metadata if WordPress is unavailable
      return {
        title: 'Clark Finance',
        description: 'Mortgage & Loan Specialists',
      };
    }
    
    const data = await response.json();
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

export default async function Home() {
  const data = await fetchHomePageContent();

  const content: HomeContent = data.acf;

  return (
    <>
      <HeroBanner
        title={content.title}
        subtitle={content.subtitle}
        cta1={content.cta_1}
        cta2={content.cta_2}
      />
      <ServiceCards classes='bg-chalk pt-28' />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ContactUs colourScheme='light' />
      </Suspense>
      <WhyClarkFinance
        sectionTitle={content.why_clark_finance_section_title}
        bodyContent={content.about_us_content}
        aboutUsButton={content.about_us_cta}
      />
      {/* <CaseStudiesSection bgColour='light' /> */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Reviews />
      </Suspense>
    </>
  );
}
