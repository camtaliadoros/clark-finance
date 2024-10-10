import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

type ButtonProps = {
  colour: string;
  title: string;
  url: string;
  target?: string;
  classes?: string;
};

export const Button = ({
  colour,
  title,
  url,
  target,
  classes,
}: ButtonProps) => {
  return (
    <div className={`${classes} inline relative overflow-hidden group`}>
      <div
        className={`absolute w-full h-full bg-${colour} -translate-x-full transition group-hover:translate-x-0`}
      ></div>
      <Link
        className={`flex items-center justify-center px-6 py-4 ${
          colour === 'chalk'
            ? 'text-chalk border-chalk'
            : 'text-mediumblue border-mediumblue'
        } border-2 overflow-hidden bg-transparent transition no-underline relative ${
          colour === 'chalk'
            ? 'group-hover:text-mediumblue'
            : 'group-hover:text-chalk'
        } `}
        href={url}
        target={target}
        prefetch={true}
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
