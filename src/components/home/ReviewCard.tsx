import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const ratingArr = [1, 2, 3, 4, 5];

  return (
    <div className='bg-white flex flex-col drop-shadow-lg p-6 h-60'>
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
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex gap-2 space-x-3 items-center'>
          <div className=' flex w-1/4'>
            {ratingArr.map((el, i) => (
              <FontAwesomeIcon
                icon={faStar}
                size='1x'
                key={i}
                className={`${
                  i < content.rating ? 'text-yellow' : 'text-mediumgrey'
                }`}
              />
            ))}
          </div>
          <p className='text-mediumgrey text-xs'>
            {content.relative_time_description}
          </p>
        </div>
        <p className='overflow-y-hidden line-clamp-6'>{content.text}</p>
      </div>
    </div>
  );
};
