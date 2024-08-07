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

export type CaseStudyContent = {
  case_study_title: string;
  loan_value: string;
  location: string;
  case_study_excerpt: string;
  case_study_article: string;
  case_study_featured_image: string;
};
