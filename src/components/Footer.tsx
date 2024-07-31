import Image from 'next/image';

export const Footer = () => {
  return (
    <div className='flex flex-col '>
      <div className='grid grid-cols-3 bg-mediumblue p-4 md:p-10'>
        <Image
          src='/images/clark-finance-logo-white.png'
          height={42}
          width={132}
          alt='Clark Finance Logo'
          loading='lazy'
          className='h-8 max-w-fit md:h-10 '
        />
        <div className='flex flex-col w-3/4'>
          <h5 className='text-chalk'>Contact Us</h5>
          <a href='tel:+442045182215' className='text-chalk'>
            0204 518 2215
          </a>
          <a href='mailto:info@clark.finance' className='text-chalk'>
            info@clark.finance
          </a>
          <p className='text-chalk'>
            Clark Finance, Bedford Heights, Brickhill Drive, Bedford MK41 7PH
          </p>
        </div>
      </div>
    </div>
  );
};
