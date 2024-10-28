import { ImageType } from '@/util/models';
import { Section } from './Section';
import Image from 'next/image';
import { convertWysywyg, fetchFeaturedImage } from '@/util/utilFunctions';

type ImageTextBlockProps = {
  image: number;
  position: 'Left' | 'Right';
  text: string;
  title: string;
  background?: boolean;
};

export const ImageTextBlock = async ({
  image,
  position,
  text,
  title,
  background,
}: ImageTextBlockProps) => {
  const imageData: ImageType = await fetchFeaturedImage(image);
  const sanitisedText = convertWysywyg(text);

  return (
    <div className='w-screen relative py-24'>
      {background && (
        <Image
          src='/images/lines.png'
          width={800}
          height={800}
          alt=''
          className={`absolute max-w-fit max-h-fit z-0  opacity-20 md:opacity-50 ${
            position === 'Right'
              ? '-rotate-90 right-0 bottom-0'
              : 'top-0 rotate-90'
          }`}
        />
      )}
      <div
        className={`relative flex flex-col lg:flex-row gap-16 w-full lg:px-48 items-start ${
          position === 'Right' ? 'lg:flex-row-reverse' : 'flex-row'
        } z-10 pb-24`}
      >
        <Image
          src={imageData.source_url}
          alt=''
          width={500}
          height={500}
          className='w-full lg:w-1/2'
          unoptimized
        />

        <div className='flex flex-col lg:w-1/2 space-y-8 px-8 lg:px-0'>
          {title && (
            <h2
              className={`${
                position === 'Right' ? 'lg:text-right' : 'text-left'
              } font-semibold'`}
            >
              {title}
            </h2>
          )}
          <div
            className={`${
              position === 'Right' ? 'lg:text-right' : 'text-left'
            } 'text-ash'`}
            dangerouslySetInnerHTML={{ __html: sanitisedText }}
          />
        </div>
      </div>
    </div>
  );
};
