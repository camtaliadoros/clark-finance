export const convertWysywyg = (rawContent: string) => {
  // const convertedContent = rawContent.replace(/(?:\r\n|\r|\n)/g, '<br />');

  const covertedLinks = rawContent.replace(
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
        revalidate: 86400,
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
      //   revalidate: 86400,
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

export const replaceWpURL = (url: string) => {
  return url.replace(
    'https://clarkfinance.wordifysites.com',
    `${process.env.NEXT_PUBLIC_HOST_URL}`
  );
};

export const fetchPageMetadata = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/fetchMetadata?id=${id}`,
    {
      // next: {
      //   revalidate: 86400,
      // },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
