import { ContactUs } from '@/components/home/ContactUs';
import { ArticleListing } from '@/components/shared/ArticleListing';
import { Pagination } from '@/components/shared/Pagination';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ArticleContentType } from '@/util/models';

export type ArticleDataType = {
  date: string;
  slug: string;
  acf: ArticleContentType;
};

export const fetchArticlesByPage = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/news/api/fetchAllArticles?page=${pageNumber}&per_page=6`,
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
};

async function fetchPageContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/news/api/fetchPageContent`,
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

export default async function InsightsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const content = await fetchPageContent();

  const currentPage = Number(searchParams?.page) || 1;

  const data = await fetchArticlesByPage(currentPage);

  const numberOfPages: number = data.totalPages;

  return (
    <>
      <Section
        type='narrow'
        classes='flex flex-col items-center justify-center bg-chequered-bg bg-cover bg-bottom bg-fixed'
      >
        <SectionTitle
          title='Insights'
          lineColour='mediumblue'
          textColour='ash'
          alignment='centred'
          classes='mb-12 md:mb-18 lg:mb-24'
        />
        <ArticleListing currentPage={currentPage} type='news' />
        <Pagination totalPages={numberOfPages} />
      </Section>
      <ContactUs colourScheme='dark' />
    </>
  );
}
