import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const response = await fetch(
    'http://clark-finance.local/wp-json/wp/v2/pages?slug=home'
  );
  const data = await response.json();

  res.status(200).json(data);
}
