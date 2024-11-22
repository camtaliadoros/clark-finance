import { RequiredDocsItemCard } from '@/components/decisionInPrinciple/RequiredDocsCard';
import { ContactUs } from '@/components/home/ContactUs';
import { Button } from '@/components/shared/Button';
import { PhoneNumberWithIcon } from '@/components/shared/PhoneNumberWithIcon';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ButtonContentFields, GraphItem, YoastHeadJson } from '@/util/models';
import { replaceWpURL } from '@/util/utilFunctions';
import { Metadata } from 'next';

type DecisionInPrincipleContent = {
  page_title: string;
  subheading: string;
  apply_text: string;
  apply_link: ButtonContentFields;
  docs_required_text: string;
  required_doc_1: string;
  required_doc_1_link: ButtonContentFields;
  required_doc_2: string;
  required_doc_2_link: ButtonContentFields;
  required_doc_3: string;
  required_doc_3_link: ButtonContentFields;
  required_doc_4: string;
  required_doc_4_link: ButtonContentFields;
  required_doc_5: string;
  required_doc_5_link: ButtonContentFields;
  required_doc_6: string;
  required_doc_6_link: ButtonContentFields;
  required_doc_7: string;
  required_doc_7_link: ButtonContentFields;
  required_doc_8: string;
  required_doc_8_link: ButtonContentFields;
};

export type RequiredDocsItem = {
  required_doc_title: string;
  required_doc_link: ButtonContentFields | null;
};

async function fetchDecisionInPrinciplePageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/decision-in-principle/api`,
    {
      next: {
        revalidate: 86400,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetchDecisionInPrinciplePageContent();

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

export default async function DecisionInPrinciplePage() {
  const data = await fetchDecisionInPrinciplePageContent();

  const content: DecisionInPrincipleContent = data.acf;

  // Organise 'Required Docs' Items into an array

  const requiredDocumentsItems: RequiredDocsItem[] = [];

  for (let i = 1; i <= 8; i++) {
    const title = `required_doc_${i}` as keyof DecisionInPrincipleContent;
    const link = `required_doc_${i}_link` as keyof DecisionInPrincipleContent;

    const item: RequiredDocsItem = {
      required_doc_title: content[title] as string,
      required_doc_link: content[link] as ButtonContentFields | null,
    };
    requiredDocumentsItems.push(item);
  }

  return (
    <>
      <Section
        type='narrow'
        classes='bg-houses bg-cover bg-bottom lg:bg-fixed flex flex-col items-center h-full py-16 lg:py-48'
      >
        <SectionTitle
          title={content.page_title}
          textColour='chalk'
          lineColour='chalk'
          alignment='centred'
          subheading={content.subheading}
        />
      </Section>
      <div className='flex flex-col px-8 lg:px-36 py-8 md:flex-row md:justify-between md:items-center space-y-8 bg-darkblue'>
        <Button
          colour='chalk'
          title={content.apply_link.title}
          url={content.apply_link.url}
          target={content.apply_link.target}
        />
        <div className='flex flex-col md:w-1/3 md:items-end space-y-4'>
          <h4 className='text-chalk text-2xl text-right'>
            Speak to our Experts today to run through your application
          </h4>
          <PhoneNumberWithIcon colour='light' size='lg' hideOnMobile={false} />
        </div>
      </div>
      <div className='flex justify-center bg-lightgrey2 md:py-8 px-0 md:px-16 xl:px-36 2xl:px-60'>
        <div className='bg-chalk flex flex-col items-center space-y-8 p-8 md:p-16  rounded-md w-full lg:w-4/5 '>
          <h2 className='font-semibold text-ash mb-12 text-2xl md:text-4xl'>
            {content.docs_required_text}
          </h2>
          <div className='flex flex-col justify-start space-y-8 lg:w-4/5'>
            {requiredDocumentsItems.map((item, i) => (
              <RequiredDocsItemCard content={item} key={i} />
            ))}
          </div>
        </div>
      </div>
      <ContactUs colourScheme='dark' />
    </>
  );
}
