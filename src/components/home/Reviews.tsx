import { Section } from '../shared/Section';
import { ReviewCard } from './ReviewCard';

async function fetchReviews() {
  const res = await fetch(`${process.env.HOST_URL}/api/reviews`, {
    next: {
      revalidate: 10,
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

  let indexes = [];

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
      classes='bg-chequered-bg bg-cover bg-bottom flex flex-row gap-12 justify-between'
    >
      {featuredReviews.map((review, i) => (
        <ReviewCard key={i} content={review} />
      ))}
    </Section>
  );
};
