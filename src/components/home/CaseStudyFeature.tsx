import { CaseStudyContent, CaseStudyFeatureTypes } from '@/util/models';
import Link from 'next/link';

type CaseStudyFeatureProps = {
  slug: string;
  content: CaseStudyContent;
};

export const CaseStudyFeature = ({ slug, content }: CaseStudyFeatureProps) => {
  return (
    <div className='justify-self-center space-y-4'>
      <Link
        className='flex relative w-56 h-56 group'
        href={`case-studies/${slug}`}
      >
        <div className='w-full h-full bg-bluegrey relative rounded-br-[120px] z-10 transition-all group-hover:opacity-90 group-hover:rounded-br-[140px]'></div>
        <div
          className={`absolute top-0 left-0 bg-lightblue
          } h-full w-full flex justify-end items-end `}
        >
          <p className='font-bold m-2 text-chalk text-sm leading-none'>MORE</p>
        </div>
      </Link>

      <div className='flex flex-col justify-start space-y-6 w-56'>
        <div className='space-y-1 '>
          <h6 className='font-normal text-base'>{content.loan_value}</h6>
          <h4 className='text-xl'>{content.case_study_title}</h4>
          <h6 className='font-normal text-base'>{content.location}</h6>
        </div>
        <p className='leading-normal'>{content.case_study_excerpt}</p>
      </div>
    </div>
  );
};
