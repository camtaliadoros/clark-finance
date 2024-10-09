import { BenefitItem, ImageType } from '@/util/models';
import { fetchFeaturedImage } from '@/util/utilFunctions';
import Image from 'next/image';

type BenefitCardProps = {
  content: BenefitItem;
  colourScheme: 'light' | 'dark';
};

export const BenefitCard = async ({
  content,
  colourScheme,
}: BenefitCardProps) => {
  const image: ImageType = await fetchFeaturedImage(content.icon);

  return (
    <div
      className={`grid grid-cols-5 w-96 ${
        colourScheme === 'light'
          ? 'bg-lightgrey2'
          : 'bg-lightblue bg-opacity-25'
      } rounded-sm p-12 gap-8`}
    >
      <Image
        src={image.source_url}
        alt={image.alt_text}
        width={120}
        height={120}
        className={`${colourScheme === 'light' ? '' : 'filter invert'}`}
      />
      <div className='col-span-4 flex flex-col'>
        <h5
          className={`${
            colourScheme === 'light' ? 'text-ash' : 'text-chalk'
          } font-semibold text-2xl`}
        >
          {content.title}
        </h5>
        <div className='flex flex-col gap-2'>
          <p
            className={`${
              colourScheme === 'light' ? 'text-ash' : 'text-chalk'
            }`}
          >
            {content.description}
          </p>
          {content.note && (
            <p
              className={`text-xs ${
                colourScheme === 'light' ? 'text-ash' : 'text-chalk'
              }`}
            >
              {content.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};