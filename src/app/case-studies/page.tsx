import { ContactUs } from '@/components/home/ContactUs';
import { CaseStudyFeature } from '@/components/shared/CaseStudyFeature';
import { FeaturedCardsWrapper } from '@/components/shared/FeaturedCardsWrapper';
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
    <>
      <Section
        type='narrow'
        classes='bg-chequered-bg bg-cover bg-fixed bg-bottom space-y-16'
      >
        <SectionTitle
          title={pageContent.page_title}
          textColour='ash'
          lineColour='mediumblue'
          alignment='centred'
        />

        <FeaturedCardsWrapper>
          {caseStudies.map((content: CaseStudyFeatureTypes) => (
            <CaseStudyFeature
              key={content.slug}
              slug={content.slug}
              content={content.acf}
              colourScheme='light'
            />
          ))}
        </FeaturedCardsWrapper>
      </Section>

      <ContactUs colourScheme='dark' />
    </>
  );
}
