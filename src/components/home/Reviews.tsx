import { useEffect, useState } from 'react';
import { Section } from '../shared/Section';

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

  // Select 3 reviews at random
  for (let i = 0; i < 3; i++) {
    featuredReviews.push(reviews[Math.floor(Math.random() * reviews.length)]);
  }

  return (
    <Section
      type='narrow'
      classes='bg-chequered-bg bg-cover bg-bottom'
    ></Section>
  );
};
