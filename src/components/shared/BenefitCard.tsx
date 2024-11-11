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
  const image = await fetchFeaturedImage(content.icon);

  return (
    <div
      className={`grid grid-cols-5 w-full- ${
        colourScheme === 'light'
          ? 'bg-lightgrey2'
          : 'bg-lightblue bg-opacity-25'
      } rounded-sm p-6 lg:p-12 gap-2 lg:gap-8`}
    >
      <Image
        src={image.source}
        alt={image.altText}
        width={120}
        height={120}
        className={`${colourScheme === 'light' ? '' : 'filter invert'}`}
        unoptimized
      />
      <div className='col-span-4 flex flex-col'>
        <h5
          className={`${
            colourScheme === 'light' ? 'text-ash' : 'text-chalk'
          } font-semibold text-xl 2xl:text-2xl`}
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
              className={`text-xs 2xl:text-base ${
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
