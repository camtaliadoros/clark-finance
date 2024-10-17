import { ButtonContentFields } from '@/util/models';
import { Button } from '../shared/Button';

type HeroBannerContent = {
  title: string;
  subtitle: string;
  cta1: ButtonContentFields;
  cta2: ButtonContentFields;
};

export const HeroBanner = async ({
  title,
  subtitle,
  cta1,
  cta2,
}: HeroBannerContent) => {
  return (
    <>
      <div className='w-full'>
        <div
          className='bg-hero-image bg-bottom md:bg-center bg-cover bg-fixed z-0  flex flex-col justify-center px-4 md:px-12 md:px-18 lg:px-24 2xl:px-60 space-y-1'
          style={{ height: '32rem' }}
        >
          <h2 className='text-chalk font-normal'>{subtitle}</h2>
          <hr className='border-chalk border-t-2 w-20' />
          <h1 className='text-chalk font-semibold '>{title}</h1>
          <div className='flex flex-col w-2/3 md:flex-row pt-9 space-y-4 md:space-x-6 md:space-y-0'>
            <Button url={cta1.url} title={cta1.title} colour='chalk' />
            <Button url={cta2.url} title={cta2.title} colour='chalk' />
          </div>
        </div>
      </div>
    </>
  );
};
