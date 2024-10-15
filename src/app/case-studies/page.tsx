import { ContactUs } from '@/components/home/ContactUs';
import { ArticleListing } from '@/components/shared/ArticleListing';
import { Pagination } from '@/components/shared/Pagination';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';

type CaseStudiesPageContent = {
  page_title: string;
  subheading: string | undefined;
};

async function fetchPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/case-studies/api/fetchPageContent`,
    {
      next: {
        revalidate: 86400,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function CaseStudiesHome({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const content = await fetchPageContent();

  const pageContent: CaseStudiesPageContent = content.acf;

  return (
    <>
      <Section
        type='narrow'
        classes='bg-chequered-bg bg-cover bg-fixed bg-bottom space-y-16 flex flex-col items-center'
      >
        <SectionTitle
          title={pageContent.page_title}
          subheading={pageContent.subheading}
          textColour='ash'
          lineColour='mediumblue'
          alignment='centred'
          classes='mb-12 md:mb-18 lg:mb-24'
        />

        <ArticleListing currentPage={currentPage} type='case studies' />
      </Section>
      <ContactUs colourScheme='dark' />
    </>
  );
}
