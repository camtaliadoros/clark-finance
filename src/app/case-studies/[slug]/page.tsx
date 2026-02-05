import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { ArticleWrapper } from '@/components/shared/ArticleWrapper';
import { Button } from '@/components/shared/Button';
import { Section } from '@/components/shared/Section';
import {
  CaseStudyContent,
  GraphItem,
  MetadataProps,
  YoastHeadJson,
} from '@/util/models';
import {
  convertWysywyg,
  fetchFeaturedImage,
  replaceWpURL,
} from '@/util/utilFunctions';
import { validateSlug } from '@/util/validateParams';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Enable ISR with 24-hour revalidation
export const revalidate = 86400;

type CaseStudyParams = {
  slug: string;
};

const fetchCaseStudy = async (slug: string) => {
  // Always fetch directly from WordPress in server components
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);
  const response = await fetch(
    `${process.env.WP_ROUTE}/case-study?slug=${slug}&_fields=acf.case_study_title,acf.loan_value,acf.location,acf.the_requirement,acf.the_interesting_stuff,acf.how_we_helped,acf.featured_image`,
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
};

const fetchCaseStudyMetadata = async (slug: string) => {
  // Always fetch directly from WordPress in server components
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);
  const response = await fetch(
    `${process.env.WP_ROUTE}/case-study?slug=${slug}&_fields=yoast_head_json`,
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
};

export async function generateMetadata({
  params,
}: {
  params: Promise<MetadataProps['params']>;
}): Promise<Metadata> {
  // Validate slug parameter
  const { slug } = await params;
  const validatedSlug = validateSlug(slug);
  if (!validatedSlug) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    };
  }

  const res = await fetchCaseStudyMetadata(validatedSlug);

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
//       `${process.env.WP_ROUTE}/case-study?_fields=slug`,
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

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<CaseStudyParams>;
}) {
  // Validate slug parameter
  const { slug } = await params;
  const validatedSlug = validateSlug(slug);
  if (!validatedSlug) {
    notFound();
  }

  const data = await fetchCaseStudy(validatedSlug);

  const content: CaseStudyContent = data[0]?.acf;
  const image = await fetchFeaturedImage(content.featured_image);

  const theRequirementContent = convertWysywyg(content.the_requirement);
  const theInterestingStuffContent = convertWysywyg(
    content.the_interesting_stuff
  );
  const howWeHelpedContent = convertWysywyg(content.how_we_helped);

  if (!content) {
    return (
      <Section
        type='narrow'
        classes='flex flex-col space-y-16 h-full items-center justify-center bg-chequered-flipped bg-cover bg-top lg:bg-fixed'
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
        imageUrl={image.source}
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
