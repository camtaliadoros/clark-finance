import { ImageType } from '@/util/models';
import { Section } from './Section';
import Image from 'next/image';
import { convertWysywyg, fetchFeaturedImage } from '@/util/utilFunctions';

type ImageTextBlockProps = {
  image: number;
  position: string;
  text: string;
  title: string;
};

export const ImageTextBlock = async ({
  image,
  position,
  text,
  title,
}: ImageTextBlockProps) => {
  const imageData: ImageType = await fetchFeaturedImage(image);
  const sanitisedText = convertWysywyg(text);

  let textImageBlock1;

  return (
    <div
      className={`flex gap-16 w-full ${
        position === 'Right' ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <Image src={imageData.source_url} alt='' width={500} height={500} />

      <div className='flex flex-col w-1/2 space-y-8'>
        {title && (
          <h2
            className={`${
              position === 'Right' ? 'text-right' : 'text-left'
            } font-semibold'`}
          >
            {title}
          </h2>
        )}
        <div
          className={`${
            position === 'Right' ? 'text-right' : 'text-left'
          } 'text-ash'`}
          dangerouslySetInnerHTML={{ __html: sanitisedText }}
        />
      </div>
    </div>
  );
};