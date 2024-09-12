import { ArticleWrapper } from '@/components/shared/ArticleWrapper';
import { Button } from '@/components/shared/Button';
import { FeaturedArticlesSection } from '@/components/shared/FeaturedArticlesSection';
import { Section } from '@/components/shared/Section';
import { ArticleContentType, ImageType } from '@/util/models';
import { convertWysywyg, fetchFeaturedImage } from '@/util/utilFunctions';

type ArticleData = {
  date: string;
  acf: ArticleContentType;
};

type ArticleParams = {
  slug: string;
};

const fetchArticle = async (slug: string) => {
  const res = await fetch(
    `${process.env.HOST_URL}/articles/api/fetchArticle?slug=${slug}`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function ArticlePage({
  params,
}: {
  params: ArticleParams;
}) {
  const data = await fetchArticle(params.slug);

  const content: ArticleData = data[0];

  const image: ImageType = await fetchFeaturedImage(content.acf.featured_image);

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
          url={'/case-studies'}
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
        <h5 className='font-normal text-mediumgrey text-base'>
          {formatedDate}
        </h5>
        <h2 className='text-ash text-2xl font-semibold'>
          {content.acf.headline}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: contentBody }} />
      </ArticleWrapper>
      <FeaturedArticlesSection bgColour='dark' />
    </>
  );
}
