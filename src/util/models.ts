export type ButtonContentFields = {
  title: string;
  url: string;
  target: string;
};

export type CaseStudyFeatureTypes = {
  slug: string;
  link?: string;
  acf: CaseStudyContent;
};

export type Service = {
  slug: string;
  link: string;
  acf: ServicePageContent;
};

export type ServicePageContent = {
  available_1: boolean;
  image_text_block_1_title: string;
  image_text_block_1_content: string;
  image_text_block_1_image: number | null;
  image_text_block_1_image_position: 'Left' | 'Right';
  available: boolean;
  image_text_block_2_title: string;
  image_text_block_2_content: string;
  image_text_block_2_image: number | null;
  image_text_block_2_image_position: 'Left' | 'Right';
  image_text_block_3_title: string;
  image_text_block_3_content: string;
  image_text_block_3_image: number | null;
  image_text_block_3_image_position: 'Left' | 'Right';
  page_title: string;
  subheading: string;
  service_title: string;
  service_excerpt: string;
  text_block_1: string;
  text_block_2: string;
  homepage_order: number;
  page_title_background_image: number;
  why_clark_finance: string;
  a1?: string;
  q1?: string;
  a2?: string;
  q2?: string;
  a3?: string;
  q3?: string;
  a4?: string;
  q4?: string;
  a5?: string;
  q5?: string;
  a6?: string;
  q6?: string;
  a7?: string;
  q7?: string;
  a8?: string;
  q8?: string;
  a9?: string;
  q9?: string;
  a10?: string;
  q10?: string;
  lenders: string;
};

export type CaseStudyFeatureContent = {
  case_study_title: string;
  loan_value: string;
  location: string;
  case_study_excerpt: string;
  featured_image: number;
};

export type ImageType = {
  source_url: string;
  alt_text: string | null;
};

export type CaseStudyContent = {
  case_study_title: string;
  case_study_excerpt: string;
  loan_value: string;
  location: string;
  the_requirement: string;
  the_interesting_stuff: string;
  how_we_helped: string;
  featured_image: number;
};

export type ArticleContentType = {
  title: string;
  headline: string;
  article_body: string;
  featured_image: number;
};

export type Page = {
  id: number;
  slug: string;
  acf: Record<string, any>;
};
