import { Section } from '../shared/Section';
import { SectionTitle } from '../shared/SectionTitle';
import { ReviewCard, type ReviewContent } from './ReviewCard';

async function fetchReviews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/reviews`, {
    next: {
      revalidate: 86400,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// Pick up to `count` unique items at random (Fisher-Yates shuffle)
function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export const Reviews = async () => {
  const reviewsData = await fetchReviews();

  const reviews: ReviewContent[] = reviewsData.result.reviews;

  const featuredReviews = pickRandom(reviews, 3);

  return (
    <Section
      type='narrow'
      classes='bg-chequered-flipped bg-cover bg-top flex flex-col py-8 md:py-12 lg:py-20'
    >
      <SectionTitle
        title='Our Reviews'
        lineColour='mediumblue'
        textColour='ash'
        alignment='centred'
      />
      <div className='mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 '>
        {featuredReviews.map((review, i) => (
          <ReviewCard key={i} content={review} />
        ))}
      </div>
    </Section>
  );
};
