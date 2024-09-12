import { ArticleContentType, ImageType } from '@/util/models';
import { ClickableImage } from '../shared/ClickableImage';
import { ArticleDataType } from '@/app/insights/page';
import { fetchFeaturedImage } from '@/util/utilFunctions';

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
    <>
      <ClickableImage slug={articleData.slug} imageUrl={image.source_url} />
    </>
  );
};
