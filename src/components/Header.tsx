import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className='flex justify-between items-center  h-16 md:h-24 bg-chalk'>
      <Image
        src='/clark-finance-logo.png'
        height={42}
        width={132}
        alt='Clark Finance Logo'
        loading='lazy'
        className='h-8 max-w-fit md:h-10 mx-4 md:mx-10 '
      />
      <div className='m-4 '>
        <p className='font-bold text-mediumblue'>Get in touch</p>
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
          <a href='mailto:info@clark.finance'>info@clark.finance</a>
        </div>
      </div>
    </div>
  );
};
