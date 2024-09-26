import { CaseStudyFeatureTypes } from '@/util/models';
import { CaseStudyFeature } from './CaseStudyFeature';
import { FeaturedCardsWrapper } from './FeaturedCardsWrapper';
import { fetchCaseStudiesByPage } from '@/app/case-studies/page';

type ArticleListingProp = {
  currentPage: number;
};

export const ArticleListing = async ({ currentPage }: ArticleListingProp) => {
  const res = await fetchCaseStudiesByPage(currentPage);

  const articles = res.pageData;

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
};
