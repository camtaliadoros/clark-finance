import { ContactUs } from '@/components/home/ContactUs';
import { ArticleListing } from '@/components/shared/ArticleListing';
import { Pagination } from '@/components/shared/Pagination';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ArticleContentType } from '@/util/models';

type PageContent = {
  page_title: string;
  subheading: string;
};

async function fetchPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/news/api/fetchPageContent`,
    {
      // next: {
      //   revalidate: 86400,
      // },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const res = await fetchPageContent();

  const content: PageContent = res.acf;

  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Section
        type='narrow'
        classes='flex flex-col items-center justify-center bg-chequered-bg bg-cover bg-bottom bg-fixed'
      >
        <SectionTitle
          title={content.page_title}
          lineColour='mediumblue'
          textColour='ash'
          alignment='centred'
          classes='mb-12 md:mb-18 lg:mb-24'
          subheading={content.subheading}
        />
        <ArticleListing currentPage={currentPage} type='news' />
      </Section>
      <ContactUs colourScheme='dark' />
    </>
  );
}
