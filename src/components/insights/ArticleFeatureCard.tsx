import { ImageType } from '@/util/models';
import { fetchFeaturedImage } from '@/util/utilFunctions';
import { ClickableImage } from '../shared/ClickableImage';
import { FeaturedCardsContentWrapper } from '../shared/FeaturedCardsContentWrapper';
import { ArticleDataType } from '@/app/news/page';

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

  const date = new Date(articleData.date);

  const formatedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='flex flex-col items-center '>
      <ClickableImage
        slug={`/news/${articleData.slug}`}
        imageUrl={image.source_url}
      />
      <FeaturedCardsContentWrapper>
        <div>
          <h2
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } font-semibold  text-xl`}
          >
            {articleData.acf.title}
          </h2>
          <h5
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-mediumgrey'
            } font-normal text-base`}
          >
            {formatedDate}
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
