import { getApiBaseUrl } from './utilFunctions';

type fetchContentParams = {
  contentType: string;
  slug: string;
};

export async function fetchContent({ contentType, slug }: fetchContentParams) {
  const baseUrl = getApiBaseUrl();
  const apiUrl = baseUrl 
    ? `${baseUrl}/api?type=${contentType}&slug=${slug}` 
    : `/api?type=${contentType}&slug=${slug}`;
  
  const res = await fetch(apiUrl, {
    next: {
      revalidate: 86400,
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
