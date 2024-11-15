import { PageLinkCard } from './PageLinkCard';
import { Section } from './Section';

type ArticleWrapperProps = {
  children: React.ReactNode;
  imageUrl: string | undefined;
  title: string;
  pageLinkCard1: 'services' | 'contactUs' | 'caseStudies' | 'insights';
  pageLinkCard2: 'services' | 'contactUs' | 'caseStudies' | 'insights';
};

export const ArticleWrapper = ({
  children,
  imageUrl,
  title,
  pageLinkCard1,
  pageLinkCard2,
}: ArticleWrapperProps) => {
  return (
    <>
      <div
        className=' relative flex justify-center items-center bg-cover lg:bg-fixed bg-center'
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'null',
        }}
      >
        <div className='absolute inset-0 bg-navy opacity-50'></div>
        <h1 className='relative text-chalk my-48 z-10'>{title}</h1>
      </div>
      <Section type='narrow' classes='px-4 py-8 '>
        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-8 mb-8'>
          <div className=' space-y-12 col-span-2'>{children}</div>
          <div className='gap-8 flex flex-col md:flex-row lg:flex-col'>
            <PageLinkCard type={pageLinkCard1} />
            <PageLinkCard type={pageLinkCard2} />
          </div>
        </div>
      </Section>
    </>
  );
};
