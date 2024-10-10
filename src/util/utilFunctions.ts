export const convertWysywyg = (rawContent: string) => {
  const convertedContent = rawContent.replace(/(?:\r\n|\r|\n)/g, '<br />');

  const covertedLinks = convertedContent.replace(
    'https://clarkfinance.wordifysites.com',
    ''
  );

  return covertedLinks;
};

export const fetchFeaturedImage = async (imageId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/fetchImage?id=${imageId}`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const fetchMenuItems = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/fetchPages`,
    {
      // next: {
      //   revalidate: 10,
      // },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const sanitiseURL = (url: string) => {
  return url.replace('https://clarkfinance.wordifysites.com', '');
};
