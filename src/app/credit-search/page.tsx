import { Button } from '@/components/shared/Button';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ButtonContentFields, GraphItem, YoastHeadJson } from '@/util/models';
import { convertWysywyg, replaceWpURL } from '@/util/utilFunctions';
import { Metadata } from 'next';

type CreditSearchContent = {
  button: ButtonContentFields;
  page_content: string;
  page_title: string;
  subheading: string;
};

async function fetchCreditSearchContent() {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || '';
  const apiUrl = baseUrl ? `${baseUrl}/credit-search/api` : '/credit-search/api';
  
  const res = await fetch(apiUrl, {
    next: {
      revalidate: 86400,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetchCreditSearchContent();

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

export default async function CreditSearchPage() {
  const data = await fetchCreditSearchContent();

  const content: CreditSearchContent = data.acf;

  const bodyContent = convertWysywyg(content.page_content);

  return (
    <Section
      type='narrow'
      classes='bg-chequered-bg bg-cover bg-bottom flex flex-col items-center py-8'
    >
      <SectionTitle
        title={content.page_title}
        textColour='ash'
        lineColour='mediumblue'
        alignment='centred'
        subheading={content.subheading}
      />
      <div
        className='md:w-2/3 mb-8'
        dangerouslySetInnerHTML={{ __html: bodyContent }}
      />
      <Button
        colour='mediumblue'
        title={content.button.title}
        url={content.button.url}
        target={content.button.target}
      />
    </Section>
  );
}
