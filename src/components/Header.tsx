import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Menu } from './Menu';
import Link from 'next/link';
import { EmailWithIcon } from './shared/emailWithIcon';
import { PhoneNumberWithIcon } from './shared/PhoneNumberWithIcon';

export const Header = () => {
  return (
    <header className='flex justify-between items-center  h-16 md:h-24 bg-chalk px-4 md:px-10 drop-shadow-md fixed w-full z-50'>
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
          <EmailWithIcon />
          <PhoneNumberWithIcon />
        </div>
        <div>
          <Menu />
        </div>
      </div>
    </header>
  );
};
