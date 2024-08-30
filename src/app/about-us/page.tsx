import { SectionTitle } from '@/components/shared/SectionTitle';

type AboutUsPageContent = {
  section_title: string;
  about_us_content: string;
  about_us_image: number;
  why_choose_us_icon_1: string;
  why_choose_us_item_title_1: string;
  why_choose_us_item_description_1: string;
  why_choose_us_icon_2: string;
  why_choose_us_item_title_2: string;
  why_choose_us_item_description_2: string;
  why_choose_us_icon_3: string;
  why_choose_us_item_title_3: string;
  why_choose_us_item_description_3: string;
  why_choose_us_icon_4: string;
  why_choose_us_item_title_4: string;
  why_choose_us_item_description_4: string;
  why_choose_us_icon_5: string;
  why_choose_us_item_title_5: string;
  why_choose_us_item_description_5: string;
  why_choose_us_icon_6: string;
  why_choose_us_item_title_6: string;
  why_choose_us_item_description_6: string;
};

async function fetchAboutUsPageContent() {
  const res = await fetch(`${process.env.HOST_URL}/about-us/api`, {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function AboutUs() {
  const data = await fetchAboutUsPageContent();

  const content: AboutUsPageContent = data[0].acf;

  return (
    <Section>
      <SectionTitle
        title={content.section_title}
        textColour='ash'
        lineColour='mediumblue'
        alignment='centred'
      />
    </Section>
  );
}
