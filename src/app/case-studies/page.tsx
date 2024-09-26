import { ContactUs } from '@/components/home/ContactUs';
import { ArticleListing } from '@/components/shared/ArticleListing';
import { Pagination } from '@/components/shared/Pagination';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';

type CaseStudiesPageContent = {
  page_title: string;
};

export async function fetchCaseStudiesByPage(pageNumber: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/case-studies/api/fetchAllCaseStudies?page=${pageNumber}`,
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
    `${process.env.NEXT_PUBLIC_HOST_URL}/case-studies/api/fetchPageContent`,
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

export default async function CaseStudiesHome({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const data = await fetchCaseStudiesByPage(currentPage);

  const numberOfPages: number = data.totalPages;

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
          textColour='ash'
          lineColour='mediumblue'
          alignment='centred'
          classes='mb-12 md:mb-18 lg:mb-24'
        />

        <ArticleListing currentPage={currentPage} type='case studies' />
        <Pagination totalPages={numberOfPages} />
      </Section>
      <ContactUs colourScheme='dark' />
    </>
  );
}
