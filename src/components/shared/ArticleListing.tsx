import { fetchCaseStudiesByPage } from '@/app/case-studies/page';

import { ArticleContentType, CaseStudyFeatureTypes } from '@/util/models';
import { ArticleFeatureCard } from '../insights/ArticleFeatureCard';
import { CaseStudyFeature } from './CaseStudyFeature';
import { FeaturedCardsWrapper } from './FeaturedCardsWrapper';
import { Pagination } from './Pagination';

type ArticleListingProp = {
  currentPage: number;
  type: 'news' | 'case studies';
};

export type ArticleDataType = {
  date: string;
  slug: string;
  acf: ArticleContentType;
};

export const fetchArticlesByPage = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/news/api/fetchAllArticles?page=${pageNumber}&per_page=6`,
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

export const ArticleListing = async ({
  currentPage,
  type,
}: ArticleListingProp) => {
  let articles;

  if (type === 'case studies') {
    const res = await fetchCaseStudiesByPage(currentPage, 6);
    articles = res.pageData;
    const numberOfPages: number = res.totalPages;

    return (
      <>
        <FeaturedCardsWrapper>
          {articles.map((content: CaseStudyFeatureTypes) => (
            <CaseStudyFeature
              key={content.slug}
              slug={content.slug}
              content={content.acf}
              colourScheme='dark'
            />
          ))}
        </FeaturedCardsWrapper>
        <Pagination totalPages={numberOfPages} />
      </>
    );
  } else if (type === 'news') {
    const res = await fetchArticlesByPage(currentPage);

    const numberOfPages: number = res.totalPages;

    articles = res.pageData;

    return (
      <>
        <FeaturedCardsWrapper>
          {articles.map((content: ArticleDataType) => (
            <ArticleFeatureCard
              articleData={content}
              key={content.slug}
              colourScheme='dark'
            />
          ))}
        </FeaturedCardsWrapper>
        <Pagination totalPages={numberOfPages} />
      </>
    );
  }
};
