import { CaseStudyFeatureContent, ImageType } from '@/util/models';
import { fetchFeaturedImage } from '@/util/utilFunctions';
import Link from 'next/link';

type CaseStudyFeatureProps = {
  slug: string;
  content: CaseStudyFeatureContent;
  colourScheme: string;
};

export const CaseStudyFeature = async ({
  slug,
  content,
  colourScheme,
}: CaseStudyFeatureProps) => {
  const image: ImageType = await fetchFeaturedImage(content.featured_image);

  return (
    <div className='justify-self-center space-y-4'>
      <Link
        className='flex relative w-56 h-56 group'
        href={`/case-studies/${slug}`}
      >
        <div
          className='bg-cover bg-center w-full h-full relative rounded-br-[120px] z-10 transition-all group-hover:opacity-90 group-hover:rounded-br-[140px]'
          style={{ backgroundImage: `url(${image.source_url})` }}
        ></div>
        <div
          className={`absolute top-0 left-0 bg-lightblue
          } h-full w-full flex justify-end items-end `}
        >
          <p className='font-bold m-2 text-chalk text-sm leading-none'>MORE</p>
        </div>
      </Link>

      <div className='flex flex-col justify-start space-y-6 w-56'>
        <div className='space-y-1 '>
          <h6
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } text-font-normal text-base`}
          >
            {content.loan_value}
          </h6>
          <h4
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } text-xl`}
          >
            {content.case_study_title}
          </h4>
          <h6
            className={`${
              colourScheme === 'light' ? 'text-chalk' : 'text-ash'
            } font-normal text-base`}
          >
            {content.location}
          </h6>
        </div>
        <p
          className={`${
            colourScheme === 'light' ? 'text-chalk' : 'text-ash'
          } leading-normal`}
        >
          {content.case_study_excerpt}
        </p>
      </div>
    </div>
  );
};
