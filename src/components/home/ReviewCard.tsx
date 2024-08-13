import Image from 'next/image';

type ReviewCardProps = {
  content: ReviewContent;
};

type ReviewContent = {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
};

export const ReviewCard = ({ content }: ReviewCardProps) => {
  console.log(content.profile_photo_url);

  return (
    <div className='bg-white flex  flex-col w-1/3 drop-shadow-lg p-6 h-60'>
      <div className='flex gap-2'>
        {content.profile_photo_url ? (
          <Image
            width={24}
            height={24}
            src={content.profile_photo_url}
            alt='review author profile photo'
            placeholder='empty'
            className='rounded w-6 h-6'
          />
        ) : null}
        <h5>{content.author_name}</h5>
      </div>
      <div className='flex flex-col'>
        <p className='text-ellipsis overflow-hidden'>{content.text}</p>
      </div>
    </div>
  );
};
