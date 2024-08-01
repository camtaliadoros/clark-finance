import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className='flex flex-col'>
      <div className='flex flex-col bg-mediumblue p-4 md:px-10 md:py-16'>
        <div className='flex flex-col space-y-8 md:grid md:grid-cols-3 md:space-y-0 mb-16'>
          <div className='space-y-8 md:w-4/5 lg:w-1/2'>
            <Image
              src='/images/clark-finance-logo-white.png'
              height={42}
              width={132}
              alt='Clark Finance Logo'
              loading='lazy'
              className='h-8 max-w-fit md:h-10 '
            />
            <p className='text-sm text-chalk'>
              Registered in England and Wales No: 13224940
            </p>
          </div>
          <div className='flex flex-col md:w-4/5 lg:w-1/2 space-y-3'>
            <h5 className='text-chalk'>Contact Us</h5>
            <a href='tel:+442045182215' className='text-chalk text-sm w-fit'>
              0204 518 2215
            </a>
            <a
              href='mailto:info@clark.finance'
              className='text-chalk text-sm w-fit'
            >
              info@clark.finance
            </a>
            <p className='text-chalk text-sm'>
              Clark Finance, Bedford Heights, Brickhill Drive, Bedford MK41 7PH
            </p>
          </div>
        </div>
        <div className='space-y-6'>
          <p className='text-sm text-chalk'>
            Clark Finance Ltd is an Appointed Representative of Connect IFA
            Limited 441505 which is Authorised and Regulated by the Financial
            Conduct Authority and is entered on the Financial Services Register
            (https://register.fca.org.uk/s/) under reference 711260. Not all
            services we offer are regulated by the FCA. The FCA does not
            regulate Business Buy to Let Mortgages and Commercial Mortgages to
            Limited Companies.
          </p>
          <p className='text-sm text-chalk'>
            The guidance and/or advice contained within this website is subject
            to the UK regulatory regime and is therefore primarily targeted at
            consumers based in the UK. There will be a fee for mortgage advice,
            the precise amount will depend upon your circumstances but we
            estimate that it will be £699
          </p>
          <p className='text-sm font-bold text-chalk'>
            Your property may be repossessed if you do not keep up repayments on
            your mortgage 
          </p>
        </div>
      </div>
      <div className='bg-darkblue p-4 md:px-10 md:py-2'>
        <p className='text-sm text-chalk font-bold'>
           &quot;Clark Finance&quot; is a trademark of Richard Clark all rights
          reserved © 2024
        </p>
      </div>
    </footer>
  );
};
