'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      console.log(data);
    };

    getData();
  });

  return <p>Home</p>;
}
