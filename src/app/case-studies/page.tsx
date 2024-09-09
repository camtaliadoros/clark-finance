import { CaseStudyFeature } from '@/components/shared/CaseStudyFeature';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CaseStudyFeatureTypes } from '@/util/models';

type CaseStudiesPageContent = {
  page_title: string;
};

async function fetchAllCaseStudies() {
  const res = await fetch(
    `${process.env.HOST_URL}/case-studies/api/fetchAllCaseStudies`,
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
}

async function fetchPageContent() {
  const res = await fetch(
    `${process.env.HOST_URL}/case-studies/api/fetchPageContent`,
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
}

export default async function CaseStudiesHome() {
  const caseStudies: CaseStudyFeatureTypes[] = await fetchAllCaseStudies();

  const content = await fetchPageContent();

  const pageContent: CaseStudiesPageContent = content.acf;

  return (
    <Section
      type='narrow'
      classes='bg-chequered-bg bg-cover bg-bottom space-y-16'
    >
      <SectionTitle
        title={pageContent.page_title}
        textColour='ash'
        lineColour='mediumblue'
        alignment='centred'
      />
      <div className='flex flex-col items-center  space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 md:items-start w-full'>
        {caseStudies.map((content: CaseStudyFeatureTypes) => (
          <CaseStudyFeature
            key={content.slug}
            slug={content.slug}
            content={content.acf}
          />
        ))}
      </div>
    </Section>
  );
}
