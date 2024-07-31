import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

type ButtonProps = {
  colour: string;
  title: string;
  url: string;
};

export const Button = ({ colour, title, url }: ButtonProps) => {
  return (
    <div className='inline relative overflow-hidden group'>
      <div className='absolute w-full h-full bg-chalk -translate-x-full transition group-hover:translate-x-0'></div>
      <Link
        className={`flex items-center px-6 py-4 text-${colour} border-chalk border-2 overflow-hidden bg-transparent transition relative ${
          colour === 'chalk'
            ? 'group-hover:text-mediumblue'
            : 'group-hover:text-chalk'
        } `}
        href={url}
      >
        {title}
        <FontAwesomeIcon
          icon={faChevronRight}
          size='sm'
          className='text-base h-5 ml-2'
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          size='sm'
          className='text-base h-5 -ml-1 '
        />
      </Link>
    </div>
  );
};
