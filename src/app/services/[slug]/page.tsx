import { ContactUs } from '@/components/home/ContactUs';
import { QAWrapper } from '@/components/services/QAWrapper';
import { BenefitCard } from '@/components/shared/BenefitCard';
import { Button } from '@/components/shared/Button';
import { ContactForm } from '@/components/shared/ContactForm';
import { ImageTextBlock } from '@/components/shared/ImageTextBlock';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import {
  BenefitItem,
  BenefitsBlock,
  GraphItem,
  MetadataProps,
  ServicePageContent,
  YoastHeadJson,
} from '@/util/models';
import {
  convertWysywyg,
  fetchFeaturedImage,
  replaceWpURL,
} from '@/util/utilFunctions';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';

type PageProps = {
  params: Params;
};

type Params = {
  slug: string;
};

const fetchPageContent = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/services/api/fetchServicePageContent?slug=${slug}`,
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
};

const fetchServiceMetadata = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/services/api/fetchServiceMetadata?slug=${slug}`,

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
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const slug = params.slug;

  const res = await fetchServiceMetadata(slug);

  const metadata: YoastHeadJson = res[0].yoast_head_json;

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

// export async function generateStaticParams() {
//   const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

//   try {
//     const response = await fetch(
//       `${process.env.WP_ROUTE}/pages?parent=249&_fields=slug`,
//       {
//         headers: {
//           Authorization: `Basic ${encodedCredentials}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const data = await response.json();

//     return data.map((article: { slug: string }) => ({
//       slug: article.slug,
//     }));
//   } catch (e) {
//     throw new Error('There was a problem retrieving the content: ' + e);
//   }
// }

export default async function Service({ params }: PageProps) {
  const data = await fetchPageContent(params.slug);

  const content: ServicePageContent = data[0].acf;

  const bgImage = await fetchFeaturedImage(content.page_title_background_image);

  const whyClarkFinanceText = convertWysywyg(content.why_clark_finance);

  let textBlock1;
  if (content.text_block_1) {
    textBlock1 = convertWysywyg(content.text_block_1);
  }

  let textBlock2;
  if (content.text_block_2) {
    textBlock2 = convertWysywyg(content.text_block_2);
  }

  const lendersContent = convertWysywyg(content.lenders);

  const benefitsArr: BenefitItem[] = [];

  for (let i = 1; i <= 6; i++) {
    const iconKey = `icon_${i}` as keyof BenefitsBlock;
    const titleKey = `title_${i}` as keyof BenefitsBlock;
    const textKey = `text_${i}` as keyof BenefitsBlock;

    const item: BenefitItem = {
      icon: content.benefits_block[iconKey] as number,
      title: content.benefits_block[titleKey] as string,
      description: content.benefits_block[textKey] as string,
    };
    benefitsArr.push(item);
  }

  return (
    <>
      <div
        className='relative flex md:px-24 items-center bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: `url("${bgImage.source}")`,
        }}
      >
        <div
          className={`absolute inset-0  ${
            {
              1: 'bg-green',
              2: 'bg-yellow',
              3: 'bg-orange',
              4: 'bg-purple',
              5: 'bg-magenta',
              6: 'bg-mediumblue',
              7: 'bg-red',
              8: 'bg-teal',
            }[content.service_card.homepage_order]
          } bg-opacity-50`}
        ></div>

        <div className='flex flex-col bg-black bg-opacity-50 md:backdrop-blur-sm h-full py-16 px-6 w-full lg:w-1/2 gap-8 z-10 '>
          <div className='flex flex-col'>
            <h1 className='text-chalk mb-8'>{content.page_title}</h1>

            <h2 className='font-semibold text-xl text-chalk'>
              {content.subheading}
            </h2>
            <div
              className='text-chalk 2xl:text-xl'
              dangerouslySetInnerHTML={{ __html: whyClarkFinanceText }}
            />
          </div>
          <div className='flex gap-8 '>
            <Button url='#contact-us' title='Get in touch' colour='chalk' />
          </div>
        </div>
      </div>
      <div className='flex w-screen md:w-fit mb-4'>
        {content.q1 && (
          <Link
            prefetch={true}
            className={`flex gap-2 items-center py-2 px-4  no-underline border-r border-chalk w-full min-w-fit ${
              {
                1: 'bg-green',
                2: 'bg-yellow',
                3: 'bg-orange',
                4: 'bg-purple',
                5: 'bg-magenta',
                6: 'bg-mediumblue',
                7: 'bg-red',
                8: 'bg-teal',
              }[content.service_card.homepage_order]
            } hover:bg-opacity-80 transition text-chalk font-semibold text-sm 2xl:text-lg`}
            href='#qa'
          >
            View our mortgage guide
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className='text-base'
            />
          </Link>
        )}
        {lendersContent && (
          <Link
            prefetch={true}
            href='#lenders'
            className={`flex gap-2 items-center py-2 px-4 no-underline border-r border-chalk w-full min-w-fit ${
              {
                1: 'bg-green',
                2: 'bg-yellow',
                3: 'bg-orange',
                4: 'bg-purple',
                5: 'bg-magenta',
                6: 'bg-mediumblue',
                7: 'bg-red',
                8: 'bg-teal',
              }[content.service_card.homepage_order]
            } hover:bg-opacity-80 transition text-chalk font-semibold text-sm 2xl:text-lg`}
          >
            View our lenders
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className='text-base'
            />
          </Link>
        )}
      </div>
      <div
        className='flex flex-col items-center py-0'
        style={
          {
            '--page-colour': {
              1: '#33A477',
              2: '#FFC844',
              3: '#F2582A',
              4: '#765298',
              5: '#C4558C',
              6: '#001F3F',
              7: '#BC2D1E',
              8: '#22A6A6',
            }[content.service_card.homepage_order],
          } as any
        }
      >
        <div className='flex'>
          <div className='lg:w-3/4 w-full flex flex-col  items-center'>
            {content.make_two_column_field_available && (
              <div className='grid  grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 px-4 md:px-8 lg:px-16 pb-8  dynamic-content'>
                <div dangerouslySetInnerHTML={{ __html: content.column_1 }} />
                <div dangerouslySetInnerHTML={{ __html: content.column_2 }} />
              </div>
            )}
            {content.available_1 && (
              <ImageTextBlock
                image={content.image_text_block_1_image}
                title={content.image_text_block_1_title}
                text={content.image_text_block_1_content}
                position='Left'
              />
            )}
          </div>
          <div
            className={`h-fit m-4 p-8 w-1/4 rounded-md hidden lg:block ${
              {
                1: 'bg-green',
                2: 'bg-yellow',
                3: 'bg-orange',
                4: 'bg-purple',
                5: 'bg-magenta',
                6: 'bg-mediumblue',
                7: 'bg-red',
                8: 'bg-teal',
              }[content.service_card.homepage_order]
            }`}
          >
            <h2 className='text-chalk'>Request a callback</h2>
            <ContactForm buttonColour='light' />
          </div>
        </div>

        {content.benefits_block_is_available && (
          <div className='bg-chequered-bg bg-cover  bg-bottom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-4 md:gap-6 lg:gap-8 px-4 lg:px-16 xl:px-36 pb-8 lg:pb-24'>
            {benefitsArr.map((content, i) => (
              <BenefitCard content={content} key={i} colourScheme='light' />
            ))}
          </div>
        )}

        {textBlock1 && (
          <div className='bg-lightgrey1 w-screen flex justify-center px-4 py-8 relative z-10'>
            <div
              className='text-ash lg:w-1/2 lg:text-left dynamic-content'
              dangerouslySetInnerHTML={{ __html: textBlock1 }}
            />
          </div>
        )}
        {content.available_2 && (
          <ImageTextBlock
            image={content.image_text_block_2_image}
            title={content.image_text_block_2_title}
            text={content.image_text_block_2_content}
            position='Right'
            background={true}
          />
        )}
        {textBlock2 && (
          <div className='relative z-10 bg-building-detail-2 bg-cover bg-fixed w-screen flex justify-center px-4 py-8 md:pb-12 lg:pb-16'>
            <div
              className='text-chalk lg:w-1/2 lg:text-left text-sm [&>*]:text-chalk [&>p]:text-sm [&>p]:mb-8 [&_h3]:text-chalk  relative z-10 dynamic-content'
              dangerouslySetInnerHTML={{ __html: textBlock2 }}
            />
          </div>
        )}
        {content.available_3 && (
          <ImageTextBlock
            image={content.image_text_block_3_image}
            title={content.image_text_block_3_title}
            text={content.image_text_block_3_content}
            position='Left'
            background={true}
          />
        )}
      </div>

      {content.q1 && <QAWrapper pageContent={content} />}
      {lendersContent && (
        <Section
          type='narrow'
          classes='bg-chequered-bg bg-cover bg-bottom flex flex-col items-center gap-16'
        >
          <SectionTitle
            title='Lenders we work with'
            textColour='ash'
            lineColour='mediumblue'
            alignment='centred'
          />
          <div
            id='lenders'
            className='flex flex-row flex-wrap gap-8 justify-center dynamic-content'
            dangerouslySetInnerHTML={{ __html: lendersContent }}
          />
        </Section>
      )}
      <ContactUs colourScheme='dark' />
    </>
  );
}
