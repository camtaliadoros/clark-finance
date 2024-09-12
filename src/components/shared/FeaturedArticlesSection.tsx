import { ArticleDataType } from '@/app/news/page';
import { ArticleFeatureCard } from '../insights/ArticleFeatureCard';
import { Button } from '../shared/Button';
import { Section } from '../shared/Section';
import { SectionTitle } from '../shared/SectionTitle';

async function fetchAllArticles() {
  const res = await fetch(`${process.env.HOST_URL}/news/api/fetchAllArticles`, {
    // next: {
    //   revalidate: 10,
    // },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const FeaturedArticlesSection = async ({
  bgColour,
}: {
  bgColour: string;
}) => {
  const data: ArticleDataType[] = await fetchAllArticles();

  const featuredContent = data.slice(0, 3);

  return (
    <Section
      type='wide'
      classes={`${
        bgColour === 'dark' ? 'bg-navy' : 'bg-chalk'
      } space-y-2 flex flex-col items-center`}
    >
      <SectionTitle
        title='Insights'
        lineColour='lightblue'
        textColour={`${bgColour === 'dark' ? 'chalk' : 'ash'}`}
        alignment='centred'
      />
      <div className='flex flex-col items-center  space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 md:items-start w-full'>
        {featuredContent.map((articleData) => (
          <ArticleFeatureCard
            articleData={articleData}
            key={articleData.slug}
            colourScheme={`${bgColour === 'light' ? 'dark' : 'light'}`}
          />
        ))}
      </div>
      <Button
        colour={`${bgColour === 'light' ? 'mediumblue' : 'chalk'}`}
        title='View all articles'
        url='/news'
        classes='w-fit'
      />
    </Section>
  );
};
