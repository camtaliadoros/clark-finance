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
