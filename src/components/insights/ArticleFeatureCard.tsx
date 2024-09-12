import { ArticleContentType, ImageType } from '@/util/models';
import { ClickableImage } from '../shared/ClickableImage';
import { ArticleDataType } from '@/app/insights/page';
import { fetchFeaturedImage } from '@/util/utilFunctions';
import { FeaturedCardsContentWrapper } from '../shared/FeaturedCardsContentWrapper';

type ArticleFeatureCardProps = {
  articleData: ArticleDataType;
  colourScheme: string;
};

export const ArticleFeatureCard = async ({
  articleData,
  colourScheme,
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
          <h2
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } font-semibold  text-2xl`}
          >
            {articleData.acf.title}
          </h2>
          <h5
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-mediumgrey'
            } font-normal text-base`}
          >
            {articleData.date}
          </h5>
        </div>
        <p
          className={`${colourScheme === 'light' ? 'text-chalk' : 'text-ash'}`}
        >
          {articleData.acf.headline}
        </p>
      </FeaturedCardsContentWrapper>
    </div>
  );
};
