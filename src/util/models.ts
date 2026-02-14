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
  parent: number;
  acf: ServicePageContent;
};

export type ServicePageContent = {
  available_1: boolean;
  available_2: boolean;
  available_3: boolean;
  image_text_block_1_title: string;
  image_text_block_1_content: string;
  image_text_block_1_image: number;
  image_text_block_1_image_position: 'Left' | 'Right';
  available: boolean;
  image_text_block_2_title: string;
  image_text_block_2_content: string;
  image_text_block_2_image: number;
  image_text_block_2_image_position: 'Left' | 'Right';
  image_text_block_3_title: string;
  image_text_block_3_content: string;
  image_text_block_3_image: number;
  image_text_block_3_image_position: 'Left' | 'Right';
  page_title: string;
  subheading: string;
  service_card: ServiceCard;
  text_block_1: string;
  text_block_2: string;
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
  benefits_block_is_available: boolean;
  benefits_block: BenefitsBlock;
  make_two_column_field_available: boolean;
  column_1: string;
  column_2: string;
};

export type BenefitsBlock = {
  icon_1: number;
  title_1: string;
  text_1: string;
  icon_2: number;
  title_2: string;
  text_2: string;
  icon_3: number;
  title_3: string;
  text_3: string;
  icon_4: number;
  title_4: string;
  text_4: string;
  icon_5: number;
  title_5: string;
  text_5: string;
  icon_6: number;
  title_6: string;
  text_6: string;
};

export type BenefitItem = {
  icon: number;
  title: string | undefined;
  description: string | undefined;
  note?: string | null;
};

export type ServiceCard = {
  service_title: string;
  service_excerpt: string;
  homepage_order: number;
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
  alt_text: string;
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
  parent: number;
  acf: Record<string, any>;
};

export type YoastHeadJson = {
  title: string;
  robots: Robots;
  canonical: string;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_url: string;
  og_site_name: string;
  twitter_card: 'summary' | 'summary_large_image' | 'player' | 'app';
  schema: Schema;
};

export type Robots = {
  index: string;
  follow: string;
  'max-snippet': string;
  'max-image-preview': string;
  'max-video-preview': string;
};

export type Schema = {
  '@graph': GraphItem[];
};

export type GraphItem = {
  '@type': string;
  description?: string;
  logo?: MetaLogo;
};

export type MetaLogo = {
  url: string;
  width: number;
  height: number;
  caption: string;
};

export type MetadataProps = {
  params: Promise<{ slug: string }>;
};
