import { ArticleFeatureCard } from '../insights/ArticleFeatureCard';
import { ArticleDataType } from './ArticleListing';
import { Button } from './Button';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';

type Response = {
  pageData: ArticleDataType[];
  totalPages: number;
};

async function fetchAllArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/news/api/fetchAllArticles?page=1&per_page=6`,
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

export const FeaturedArticlesSection = async ({
  bgColour,
}: {
  bgColour: string;
}) => {
  const data: Response = await fetchAllArticles();

  const featuredContent = data.pageData;

  return (
    <Section
      type='wide'
      classes={`${
        bgColour === 'dark' ? 'bg-navy' : 'bg-chalk'
      } space-y-2 flex flex-col items-center`}
    >
      <SectionTitle
        title='Insights'
        lineColour='mediumblue'
        textColour={`${bgColour === 'dark' ? 'chalk' : 'ash'}`}
        alignment='centred'
        classes='2xl:mb-12'
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
