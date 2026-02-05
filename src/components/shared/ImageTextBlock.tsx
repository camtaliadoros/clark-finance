import { convertWysywyg, fetchFeaturedImage } from '@/util/utilFunctions';
import Image from 'next/image';

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
  const imageData = await fetchFeaturedImage(image);
  const sanitisedText = convertWysywyg(text);

  return (
    <div className='relative py-24 flex justify-center'>
      {background && (
        <Image
          src='/images/lines.png'
          width={400}
          height={400}
          alt=''
          className={`absolute max-w-fit max-h-fit z-0  opacity-20 md:opacity-50 ${
            position === 'Right'
              ? '-rotate-90 right-0 -bottom-5'
              : '-top-5 rotate-90'
          }`}
          loading='lazy'
        />
      )}
      <div
        className={`relative flex flex-col lg:flex-row gap-16 w-full lg:w-3/4 items-start justify-center ${
          position === 'Right' ? 'lg:flex-row-reverse' : 'flex-row'
        } z-10 pb-24`}
      >
        <Image
          src={imageData.source}
          alt={imageData.altText}
          width={500}
          height={500}
          className='w-full lg:w-1/2'
          loading='lazy'
          sizes='(max-width: 1024px) 100vw, 50vw'
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
            } text-ash [&>p]:text-sm dynamic-content`}
            dangerouslySetInnerHTML={{ __html: sanitisedText }}
          />
        </div>
      </div>
    </div>
  );
};
