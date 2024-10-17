import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { ArticleWrapper } from '@/components/shared/ArticleWrapper';
import { Button } from '@/components/shared/Button';
import { Section } from '@/components/shared/Section';
import {
  CaseStudyContent,
  GraphItem,
  ImageType,
  MetadataProps,
  YoastHeadJson,
} from '@/util/models';
import {
  convertWysywyg,
  fetchFeaturedImage,
  replaceWpURL,
} from '@/util/utilFunctions';
import { Metadata } from 'next';

type CaseStudyParams = {
  slug: string;
};

const fetchCaseStudy = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/case-studies/api/fetchCaseStudy?slug=${slug}`,
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
};

const fetchCaseStudyMetadata = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/case-studies/api/fetchCaseStudyMetadata?slug=${slug}`,
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
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const slug = params.slug;

  const res = await fetchCaseStudyMetadata(slug);

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

export default async function CaseStudyDetailPage({
  params,
}: {
  params: CaseStudyParams;
}) {
  const data = await fetchCaseStudy(params.slug);

  const content: CaseStudyContent = data[0]?.acf;
  const image: ImageType = await fetchFeaturedImage(content.featured_image);

  const theRequirementContent = convertWysywyg(content.the_requirement);
  const theInterestingStuffContent = convertWysywyg(
    content.the_interesting_stuff
  );
  const howWeHelpedContent = convertWysywyg(content.how_we_helped);

  if (!content) {
    return (
      <Section
        type='narrow'
        classes='flex flex-col space-y-16 h-full items-center justify-center bg-chequered-flipped bg-cover bg-top bg-fixed'
      >
        <h2 className='text-ash'>This page does not exist</h2>
        <Button
          title='View other case studies'
          url={'/case-studies'}
          colour='mediumblue'
        />
      </Section>
    );
  }

  return (
    <>
      <ArticleWrapper
        imageUrl={image.source_url}
        title={content.case_study_title}
        pageLinkCard1='services'
        pageLinkCard2='contactUs'
      >
        <div className='space-y-6'>
          <h2 className='text-ash font-semibold text-xl 2xl:text-3xl'>
            Loan Value: {content.loan_value}
          </h2>
          <h2 className='text-ash font-semibold text-xl 2xl:text-3xl'>
            Location: {content.location}
          </h2>
        </div>
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold 2xl:text-3xl'>
            The Requirement
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: theRequirementContent }}
            className='2xl:text-2xl'
          />
        </div>
        <div className='space-y-4'>
          <h3 className='text-xl  2xl:text-3xl font-semibold'>
            The Interesting Stuff
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: theInterestingStuffContent }}
            className='2xl:text-2xl'
          />
        </div>
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold 2xl:text-3xl'>How We Helped</h3>
          <div
            dangerouslySetInnerHTML={{ __html: howWeHelpedContent }}
            className='2xl:text-2xl'
          />
        </div>
      </ArticleWrapper>
      <CaseStudiesSection bgColour='dark' />
    </>
  );
}
