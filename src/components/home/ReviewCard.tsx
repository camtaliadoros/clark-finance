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
    <div className='bg-white flex flex-col drop-shadow-lg p-6 2xl:p-8 h-60 2xl:h-80'>
      <div className='flex gap-2'>
        {content.profile_photo_url ? (
          <Image
            width={24}
            height={24}
            src={content.profile_photo_url}
            alt='review author profile photo'
            placeholder='empty'
            className='rounded w-6 h-6 2xl:h-10 2xl:w-10'
          />
        ) : null}
        <h5>{content.author_name}</h5>
      </div>
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex gap-2 items-center'>
          <div className=' flex'>
            {ratingArr.map((el, i) => (
              <FontAwesomeIcon
                icon={faStar}
                size='sm'
                key={i}
                className={`${
                  i < content.rating ? 'text-yellow' : 'text-mediumgrey'
                } w-3 h-auto text-base 2xl:text-xl`}
              />
            ))}
          </div>
          <p className='text-mediumgrey text-xs 2xl:text-base mb-0'>
            {content.relative_time_description}
          </p>
        </div>
        <p className='overflow-y-hidden line-clamp-7 text-sm leading-tight'>
          {content.text}
        </p>
      </div>
    </div>
  );
};
