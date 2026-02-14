import { ImageType } from './models';

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

  const imageData: ImageType = await res.json();

  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const response = await fetch(imageData.source_url, {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch image');

  const arrayBuffer = await response.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );

  // If svg the mime type should be 'svg+xml', if png, 'image/png'
  // (Obviously doesn't scale to other image types)
  let mimeType;

  if (imageData.source_url.endsWith('.svg')) {
    mimeType = 'svg+xml';
  } else if (imageData.source_url.endsWith('.png')) {
    mimeType = 'image/png';
  } else if (imageData.source_url.endsWith('.jpg')) {
    mimeType = 'image/jpeg';
  }

  const image = {
    altText: imageData.alt_text,
    source: `data:image/${mimeType};base64,${base64}`,
  };

  return image;
};

export const fetchMenuItems = async () => {
  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const res = await fetch(
    `${process.env.WP_ROUTE}/pages?per_page=30&_fields=slug,id,acf.menu_location,acf.menu_position,acf.service_card.homepage_order,acf.page_title,parent`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
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

export const sanitiseURL = (url: string) => {
  return url.replace('https://clarkfinance.wordifysites.com', '');
};

export const replaceWpURL = (url: string) => {
  return url.replace(
    'https://clarkfinance.wordifysites.com',
    `${process.env.NEXT_PUBLIC_HOST_URL}`
  );
};
