import { CaseStudyFeatureContent, ImageType } from '@/util/models';
import { fetchFeaturedImage } from '@/util/utilFunctions';
import Link from 'next/link';
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
  const image: ImageType = await fetchFeaturedImage(content.featured_image);

  return (
    <div className='justify-self-center space-y-4'>
      <ClickableImage
        slug={`/case-studies/${slug}`}
        imageUrl={image.source_url}
      />
      <FeaturedCardsContentWrapper>
        <div className='space-y-1 '>
          <h6
            className={`${
              colourScheme === 'light' ? 'text-ash' : 'text-chalk'
            } text-font-normal text-base`}
          >
            {content.loan_value}
          </h6>
          <h4
            className={`${
              colourScheme === 'light' ? 'text-ash' : 'text-chalk'
            } text-xl`}
          >
            {content.case_study_title}
          </h4>
          <h6
            className={`${
              colourScheme === 'light' ? 'text-ash' : 'text-chalk'
            } font-normal text-base`}
          >
            {content.location}
          </h6>
        </div>
        <p
          className={`${
            colourScheme === 'light' ? 'text-ash' : 'text-chalk'
          } leading-normal`}
        >
          {content.case_study_excerpt}
        </p>
      </FeaturedCardsContentWrapper>
    </div>
  );
};
