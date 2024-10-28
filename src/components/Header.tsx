import Image from 'next/image';
import Link from 'next/link';
import { Menu } from './Menu';
import { EmailWithIcon } from './shared/EmailWithIcon';
import { PhoneNumberWithIcon } from './shared/PhoneNumberWithIcon';

export const Header = () => {
  return (
    <header className='flex justify-between items-center  h-16 md:h-24 bg-chalk px-4 md:px-10 drop-shadow-md shrink-0 w-full z-50 space-x-4'>
      <Link href='/' prefetch={true}>
        <Image
          src='/images/clark-finance-logo.png'
          height={42}
          width={132}
          alt='Clark Finance Logo'
          className='h-8 2xl:h-16 max-w-fit w-full md:h-10 '
          priority={true}
        />
      </Link>
      <div className='flex  space-x-2 md:space-x-8'>
        <div className='flex space-x-2 md:space-x-4 items-center '>
          <p className='font-bold text-mediumblue mb-0'>Get in touch:</p>
          <EmailWithIcon colour='dark' hideOnMobile={true} />
          <PhoneNumberWithIcon colour='dark' size='sm' hideOnMobile={true} />
        </div>
        <div className='flex justify-center items-center'>
          <Menu />
        </div>
      </div>
    </header>
  );
};
