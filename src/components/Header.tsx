import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Menu } from './Menu';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className='flex justify-between items-center  h-16 md:h-24 bg-chalk px-4 md:px-10 drop-shadow-md fixed w-full z-50'>
      <Link href='/'>
        <Image
          src='/images/clark-finance-logo.png'
          height={42}
          width={132}
          alt='Clark Finance Logo'
          className='h-8 max-w-fit md:h-10 '
          priority={true}
        />
      </Link>
      <div className='flex space-x-8'>
        <div className='flex space-x-4 items-center'>
          <p className='font-bold text-mediumblue mb-0'>Get in touch</p>
          <a
            className='flex items-center space-x-1 link'
            href='mailto:info@clark.finance'
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              size={'sm'}
              className='text-base h-4'
            />
            <p className='hidden md:block'>info@clark.finance</p>
          </a>

          <a
            href='tel:+442045182215'
            className='flex items-center space-x-1 link'
          >
            <FontAwesomeIcon
              icon={faPhone}
              size={'sm'}
              className='text-base h-4'
            />
            <p className='hidden md:block'>02045 182 215</p>
          </a>
        </div>
        <div>
          <Menu />
        </div>
      </div>
    </div>
  );
};
