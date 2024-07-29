import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Menu } from './Menu';

export const Header = () => {
  return (
    <div className='flex justify-between items-center  h-16 md:h-24 bg-chalk px-4 md:px-10 '>
      <Image
        src='/clark-finance-logo.png'
        height={42}
        width={132}
        alt='Clark Finance Logo'
        loading='lazy'
        className='h-8 max-w-fit md:h-10 '
      />
      <div className='flex space-x-8'>
        <div className='flex space-x-4'>
          <p className='font-bold text-mediumblue'>Get in touch</p>
          <div className='flex items-center space-x-1'>
            <FontAwesomeIcon
              icon={faEnvelope}
              size={'sm'}
              className='text-base h-4'
            />
            <a href='mailto:info@clark.finance'>info@clark.finance</a>
          </div>
          <div className='flex items-center space-x-1'>
            <FontAwesomeIcon
              icon={faPhone}
              size={'sm'}
              className='text-base h-4'
            />
            <a href='tel:+442045182215'>02045 182 215</a>
          </div>
        </div>
        <div>
          <Menu />
        </div>
      </div>
    </div>
  );
};
