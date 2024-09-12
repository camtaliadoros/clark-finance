import { ContactUs } from '@/components/home/ContactUs';
import { ArticleFeatureCard } from '@/components/insights/ArticleFeatureCard';
import { FeaturedCardsWrapper } from '@/components/shared/FeaturedCardsWrapper';
import { Section } from '@/components/shared/Section';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ArticleContentType } from '@/util/models';

export type ArticleDataType = {
  date: string;
  slug: string;
  acf: ArticleContentType;
};

const fetchAllArticles = async () => {
  const res = await fetch(
    `${process.env.HOST_URL}/insights/api/fetchAllArticles`,
    {
      //   next: {
      //     revalidate: 10,
      //   },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function InsightsPage() {
  const data: ArticleDataType[] = await fetchAllArticles();

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
        />
        <FeaturedCardsWrapper>
          {data.map((articleData, i) => (
            <ArticleFeatureCard articleData={articleData} key={i} />
          ))}
        </FeaturedCardsWrapper>
      </Section>
      <ContactUs colourScheme='dark' />
    </>
  );
}
