import { fetchCaseStudiesByPage } from '@/app/case-studies/page';
import { ArticleDataType, fetchArticlesByPage } from '@/app/news/page';
import { CaseStudyFeatureTypes } from '@/util/models';
import { ArticleFeatureCard } from '../insights/ArticleFeatureCard';
import { CaseStudyFeature } from './CaseStudyFeature';
import { FeaturedCardsWrapper } from './FeaturedCardsWrapper';

type ArticleListingProp = {
  currentPage: number;
  type: 'news' | 'case studies';
};

export const ArticleListing = async ({
  currentPage,
  type,
}: ArticleListingProp) => {
  let articles;

  if (type === 'case studies') {
    const res = await fetchCaseStudiesByPage(currentPage);
    articles = res.pageData;

    return (
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
    );
  } else if (type === 'news') {
    const res = await fetchArticlesByPage(currentPage);
    articles = res.pageData;

    console.log(articles);

    return (
      <FeaturedCardsWrapper>
        {articles.map((content: ArticleDataType) => (
          <ArticleFeatureCard
            articleData={content}
            key={content.slug}
            colourScheme='dark'
          />
        ))}
      </FeaturedCardsWrapper>
    );
  }
};
