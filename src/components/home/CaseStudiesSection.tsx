import { CaseStudyContent, CaseStudyFeatureTypes } from '@/util/models';
import { Button } from '../shared/Button';
import { CaseStudyFeature } from '../shared/CaseStudyFeature';
import { Section } from '../shared/Section';
import { SectionTitle } from '../shared/SectionTitle';

async function fetchAllCaseStudies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/case-studies/api/fetchAllCaseStudies?page=1&items=3`,
    {
      // next: {
      //   revalidate: 10,
      // },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const CaseStudiesSection = async ({
  bgColour,
}: {
  bgColour: 'dark' | 'light';
}) => {
  const caseStudiesData = await fetchAllCaseStudies();

  const featuredContent: CaseStudyFeatureTypes[] = caseStudiesData.pageData;

  return (
    <Section
      type='narrow'
      classes={`${
        bgColour === 'dark' ? 'bg-building-detail' : 'bg-chalk'
      } bg-cover space-y-2 flex flex-col items-center`}
    >
      <SectionTitle
        title='Case Studies'
        lineColour='mediumblue'
        textColour={`${bgColour === 'dark' ? 'chalk' : 'ash'}`}
        alignment='centred'
        classes='mb-12 md:mb-18 lg:mb-24'
      />
      <div className='flex flex-col items-center  space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 md:items-start w-full'>
        {featuredContent.map((content: CaseStudyFeatureTypes) => (
          <CaseStudyFeature
            key={content.slug}
            slug={content.slug}
            content={content.acf}
            colourScheme={`${bgColour === 'light' ? 'dark' : 'light'}`}
          />
        ))}
      </div>
      <Button
        colour={`${bgColour === 'light' ? 'mediumblue' : 'chalk'}`}
        title='View all case studies'
        url='/case-studies'
        classes='w-fit'
      />
    </Section>
  );
};
