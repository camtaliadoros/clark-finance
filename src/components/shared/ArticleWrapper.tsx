import { CaseStudiesSection } from '../home/CaseStudiesSection';
import { PageLinkCard } from './PageLinkCard';
import { Section } from './Section';

type ArticleWrapperProps = {
  children: React.ReactNode;
  imageUrl: string;
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
        className=' relative flex justify-center items-center bg-cover bg-fixed bg-center'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className='absolute inset-0 bg-navy opacity-50'></div>
        <h1 className='relative text-chalk my-48 z-10'>{title}</h1>
      </div>
      <Section type='narrow' classes=''>
        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-16'>
          <div className=' space-y-12 col-span-2'>{children}</div>
          <div className='gap-16 flex flex-col md:flex-row lg:flex-col'>
            <PageLinkCard type={pageLinkCard1} />
            <PageLinkCard type={pageLinkCard2} />
          </div>
        </div>
      </Section>
      <CaseStudiesSection bgColour='bg-navy' />
    </>
  );
};
