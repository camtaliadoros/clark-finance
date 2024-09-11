import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { Button } from '@/components/shared/Button';
import { PageLinkCard } from '@/components/shared/PageLinkCard';
import { Section } from '@/components/shared/Section';
import { CaseStudyContent, ImageType } from '@/util/models';
import { convertWysywyg, fetchFeaturedImage } from '@/util/utilFunctions';

type CaseStudyParams = {
  slug: string;
};

const fetchCaseStudy = async (slug: string) => {
  const res = await fetch(
    `${process.env.HOST_URL}/case-studies/api/fetchCaseStudy?slug=${slug}`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function CaseStudyDetailPage({
  params,
}: {
  params: CaseStudyParams;
}) {
  const data = await fetchCaseStudy(params.slug);

  const content: CaseStudyContent = data[0]?.acf;
  const image: ImageType = await fetchFeaturedImage(content.featured_image);

  const theRequirementContent = convertWysywyg(content.the_requirement);
  const theInterestingStuffContent = convertWysywyg(
    content.the_interesting_stuff
  );
  const howWeHelpedContent = convertWysywyg(content.how_we_helped);

  if (!content) {
    return (
      <Section
        type='narrow'
        classes='flex flex-col space-y-16 h-full items-center justify-center bg-chequered-flipped bg-cover bg-top bg-fixed'
      >
        <h2 className='text-ash'>This page does not exist</h2>
        <Button
          title='View other case studies'
          url={'/case-studies'}
          colour='mediumblue'
        />
      </Section>
    );
  }

  return (
    <>
      <div
        className=' relative flex justify-center items-center bg-cover bg-fixed bg-center'
        style={{
          backgroundImage: `url(${image.source_url})`,
        }}
      >
        <div className='absolute inset-0 bg-navy opacity-50'></div>
        <h1 className='relative text-chalk my-48 z-10'>
          {content.case_study_title}
        </h1>
      </div>
      <Section type='narrow' classes=''>
        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-16'>
          <div className=' space-y-12 col-span-2'>
            <div className='space-y-6'>
              <h2 className='text-ash font-semibold text-xl'>
                Loan Value: {content.loan_value}
              </h2>
              <h2 className='text-ash font-semibold text-xl'>
                Location: {content.location}
              </h2>
            </div>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>The Requirement</h3>
              <div
                dangerouslySetInnerHTML={{ __html: theRequirementContent }}
              />
            </div>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>The Interesting Stuff</h3>
              <div
                dangerouslySetInnerHTML={{ __html: theInterestingStuffContent }}
              />
            </div>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>How We Helped</h3>
              <div dangerouslySetInnerHTML={{ __html: howWeHelpedContent }} />
            </div>
          </div>
          <div className='gap-16 flex flex-col md:flex-row lg:flex-col'>
            <PageLinkCard type='services' />
            <PageLinkCard type='contactUs' />
          </div>
        </div>
      </Section>
      <CaseStudiesSection bgColour='bg-navy' />
    </>
  );
}
