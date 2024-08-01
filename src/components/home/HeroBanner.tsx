import { fetchContent } from '@/util/fetch';
import { ButtonContentFields } from '@/util/models';
import { Button } from '../shared/Button';

type HeroBannerContent = {
  title: string;
  subtitle: string;
  cta_1: ButtonContentFields;
  cta_2: ButtonContentFields;
};

export const HeroBanner = async () => {
  const data = await fetchContent({
    contentType: 'pages',
    slug: 'home',
  });

  const content: HeroBannerContent = data[0].acf;

  return (
    <>
      <div className='bg-hero-image bg-cover flex flex-col justify-center px-12 md:px-18 lg:px-24 space-y-1'>
        <h2 className='text-chalk font-normal text-xl'>{content.subtitle}</h2>
        <hr className='border-chalk border-t-2 w-20' />
        <h1 className='text-chalk font-semibold text-4xl'>{content.title}</h1>
        <div className='flex flex-col w-2/3 md:flex-row pt-9 space-y-4 md:space-x-6 md:space-y-0'>
          <Button
            url={content.cta_1.url}
            title={content.cta_1.title}
            colour='chalk'
          />
          <Button
            url={content.cta_2.url}
            title={content.cta_2.title}
            colour='chalk'
          />
        </div>
      </div>
      <div className='bg-navy h-24'></div>
    </>
  );
};
