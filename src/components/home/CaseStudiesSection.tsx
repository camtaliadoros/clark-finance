import { CaseStudyContent, CaseStudyFeatureTypes } from '@/util/models';
import { Button } from '../shared/Button';
import { CaseStudyFeature } from '../shared/CaseStudyFeature';
import { Section } from '../shared/Section';
import { SectionTitle } from '../shared/SectionTitle';

async function fetchAllCaseStudies() {
  const res = await fetch(
    `${process.env.HOST_URL}/case-studies/api/fetchAllCaseStudies`,
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
  bgColour: string;
}) => {
  const caseStudiesData: CaseStudyFeatureTypes[] = await fetchAllCaseStudies();

  const featuredContent = caseStudiesData.slice(0, 3);

  return (
    <Section
      type='wide'
      classes={`${bgColour} space-y-20 flex flex-col items-center`}
    >
      <SectionTitle
        title='Case Studies'
        lineColour='lightblue'
        textColour={`${bgColour === 'dark' ? 'ash' : 'chalk'}`}
        alignment='centred'
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
