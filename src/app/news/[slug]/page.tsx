import { ArticleWrapper } from '@/components/shared/ArticleWrapper';
import { Button } from '@/components/shared/Button';
import { FeaturedArticlesSection } from '@/components/shared/FeaturedArticlesSection';
import { Section } from '@/components/shared/Section';
import {
  ArticleContentType,
  GraphItem,
  ImageType,
  YoastHeadJson,
} from '@/util/models';
import {
  convertWysywyg,
  fetchFeaturedImage,
  replaceWpURL,
} from '@/util/utilFunctions';
import { Metadata } from 'next';

type ArticleData = {
  date: string;
  acf: ArticleContentType;
};

type ArticleParams = {
  slug: string;
};

const fetchArticle = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/news/api/fetchArticle?slug=${slug}`,
    {
      // next: {
      //   revalidate: 86400,
      // },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch article data');
  }
  return res.json();
};

const fetchArticleMetadata = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/news/api/fetchArticleMetadata?slug=${slug}`,
    {
      // next: {
      //   revalidate: 86400,
      // },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch article metadata');
  }
  return res.json();
};

// export async function generateStaticParams() {
//   const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

//   try {
//     const response = await fetch(
//       `${process.env.WP_ROUTE}/article?_fields=slug`,
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
//     console.log(e);
//   }
// }

export async function generateMetadata({
  params,
}: {
  params: ArticleParams;
}): Promise<Metadata> {
  const slug = params.slug;

  const res = await fetchArticleMetadata(slug);

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
    title,
    description,
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
      description,
      images:
        'https://clarkfinance.wordifysites.com/wp-content/uploads/2024/10/Clark-Finance-Logo-High-Quality.png',
    },
    alternates: {
      canonical,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: ArticleParams;
}) {
  const { slug } = params;

  const data = await fetchArticle(slug);

  const content: ArticleData = data[0];

  const image: ImageType = content.acf.featured_image
    ? await fetchFeaturedImage(content.acf.featured_image)
    : null;

  const contentBody = convertWysywyg(content.acf.article_body);

  const date = new Date(content.date);
  const formatedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (!content) {
    return (
      <Section
        type='narrow'
        classes='flex flex-col space-y-16 h-full items-center justify-center bg-chequered-flipped bg-cover bg-top bg-fixed'
      >
        <h2 className='text-ash'>This page does not exist</h2>
        <Button
          title='View other case studies'
          url='/case-studies'
          colour='mediumblue'
        />
      </Section>
    );
  }

  return (
    <>
      <ArticleWrapper
        title={content.acf.title}
        imageUrl={image.source_url}
        pageLinkCard1='contactUs'
        pageLinkCard2='services'
      >
        <h5 className='font-normal text-mediumgrey text-base 2xl:text-xl'>
          {formatedDate}
        </h5>
        <h2 className='text-ash text-2xl 2xl:text-3xl font-semibold'>
          {content.acf.headline}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: contentBody }}
          className='2xl:text-2xl'
        />
      </ArticleWrapper>
      <FeaturedArticlesSection bgColour='dark' />
    </>
  );
}
