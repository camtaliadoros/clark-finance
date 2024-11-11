import { Section } from '../shared/Section';
import { SectionTitle } from '../shared/SectionTitle';
import { ReviewCard } from './ReviewCard';

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

export const Reviews = async () => {
  const reviewsData = await fetchReviews();

  const reviews = reviewsData.result.reviews;

  const featuredReviews = [];

  let indexes: number[] = [];

  while (indexes.length < 3) {
    // Choose an element index at random
    const randomI = Math.floor(Math.random() * reviews.length);

    // Check if index already been chosen
    const iExists = indexes.find((i) => i === randomI);
    if (!iExists) {
      // Add index to indexes array
      indexes.push(randomI);

      // Add review to featured reviews array
      featuredReviews.push(reviews[randomI]);
    }
  }

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
