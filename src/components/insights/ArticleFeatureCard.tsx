import { ArticleContentType, ImageType } from '@/util/models';
import { ClickableImage } from '../shared/ClickableImage';
import { ArticleDataType } from '@/app/insights/page';
import { fetchFeaturedImage } from '@/util/utilFunctions';
import { FeaturedCardsContentWrapper } from '../shared/FeaturedCardsContentWrapper';

type ArticleFeatureCardProps = {
  articleData: ArticleDataType;
};

export const ArticleFeatureCard = async ({
  articleData,
}: ArticleFeatureCardProps) => {
  const image: ImageType = await fetchFeaturedImage(
    articleData.acf.featured_image
  );

  return (
    <div className='flex flex-col items-center '>
      <ClickableImage
        slug={`/insights/${articleData.slug}`}
        imageUrl={image.source_url}
      />
      <FeaturedCardsContentWrapper>
        <div>
          <h2 className='font-semibold text-ash text-2xl'>
            {articleData.acf.title}
          </h2>
          <h5 className='font-normal text-base text-mediumgrey'>
            {articleData.date}
          </h5>
        </div>
        <p>{articleData.acf.headline}</p>
      </FeaturedCardsContentWrapper>
    </div>
  );
};
