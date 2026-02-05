import { fetchFeaturedImage } from '@/util/utilFunctions';
import { ArticleDataType } from '../shared/ArticleListing';
import { ClickableImage } from '../shared/ClickableImage';
import { FeaturedCardsContentWrapper } from '../shared/FeaturedCardsContentWrapper';

type ArticleFeatureCardProps = {
  articleData: ArticleDataType;
  colourScheme: string;
};

export const ArticleFeatureCard = async ({
  articleData,
  colourScheme,
}: ArticleFeatureCardProps) => {
  const image = await fetchFeaturedImage(articleData.acf.featured_image);

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
        imageUrl={image.source}
      />
      <FeaturedCardsContentWrapper>
        <div>
          <h2
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } font-semibold  text-xl 2xl:text-3xl`}
          >
            {articleData.acf.title}
          </h2>
          <time
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-mediumgrey'
            } font-normal text-base 2xl:text-xl block`}
            dateTime={articleData.date}
          >
            {formatedDate}
          </time>
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
