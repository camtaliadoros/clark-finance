import { Button } from '@/components/shared/Button';
import { Section } from '@/components/shared/Section';

type CaseStudyParams = {
  slug: string;
};

const fetchCaseStudy = async (slug: string) => {
  const res = await fetch(
    `${process.env.HOST_URL}/case-studies/api/fetchCaseStudy?slug=${slug}`,
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

export default async function CaseStudyDetailPage({
  params,
}: {
  params: CaseStudyParams;
}) {
  const data = await fetchCaseStudy(params.slug);

  const content = data[0]?.acf;

  if (!content) {
    return (
      <Section
        type='narrow'
        classes='flex flex-col space-y-16 h-full items-center justify-center bg-chequered-flipped bg-cover bg-top bg-fixed'
      >
        <h2 className='text-ash'>This page does not exist</h2>
        <Button
          title='View other case studies'
          url={'/case-studies'}
          colour='mediumblue'
        />
      </Section>
    );
  }

  return <p>Case Study {params.slug}</p>;
}
