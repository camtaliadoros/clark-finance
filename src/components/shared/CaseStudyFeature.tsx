import { CaseStudyFeatureContent } from '@/util/models';
import { fetchFeaturedImage } from '@/util/utilFunctions';
import { ClickableImage } from './ClickableImage';
import { FeaturedCardsContentWrapper } from './FeaturedCardsContentWrapper';

type CaseStudyFeatureProps = {
  slug: string;
  content: CaseStudyFeatureContent;
  colourScheme: string;
};

export const CaseStudyFeature = async ({
  slug,
  content,
  colourScheme,
}: CaseStudyFeatureProps) => {
  const image = await fetchFeaturedImage(content.featured_image);

  return (
    <div className='justify-self-center space-y-4'>
      <ClickableImage slug={`/case-studies/${slug}`} imageUrl={image.source} />
      <FeaturedCardsContentWrapper>
        <div className='space-y-1 2xl:space-y-4 '>
          <h6
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } font-normal text-base 2xl:text-2xl`}
          >
            {content.loan_value}
          </h6>
          <h4
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } text-xl 2xl:text-3xl`}
          >
            {content.case_study_title}
          </h4>
          <h6
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } font-normal text-base 2xl:text-2xl`}
          >
            {content.location}
          </h6>
        </div>
        <p
          className={`${
            colourScheme === 'light' ? 'text-chalk' : 'text-ash'
          } leading-normal`}
        >
          {content.case_study_excerpt}
        </p>
      </FeaturedCardsContentWrapper>
    </div>
  );
};
