import { ArticleFeatureCard } from '@/components/insights/ArticleFeatureCard';
import { Section } from '@/components/shared/Section';
import { ArticleContentType } from '@/util/models';

export type ArticleDataType = {
  date: string;
  slug: string;
  acf: ArticleContentType;
};

const fetchAllArticles = async () => {
  const res = await fetch(`${process.env.HOST_URL}/insights/api`, {
    //   next: {
    //     revalidate: 10,
    //   },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function InsightsPage() {
  const data: ArticleDataType[] = await fetchAllArticles();

  console.log(data);

  return (
    <Section type='narrow'>
      {data.map((articleData, i) => (
        <ArticleFeatureCard articleData={articleData} key={i} />
      ))}
    </Section>
  );
}
