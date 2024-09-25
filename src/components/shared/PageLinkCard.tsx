import { ButtonContentFields } from '@/util/models';
import { Button } from './Button';

type PageLinkCardProps = {
  type: keyof LinkCardsContentType;
};

type CardContentType = {
  title: string;
  content: string;
  button: ButtonContentType;
};

type ButtonContentType = {
  title: string;
  url: string;
};

type LinkCardsContentType = {
  services: CardContentType;
  caseStudies: CardContentType;
  contactUs: CardContentType;
  insights: CardContentType;
};

const linkCardsContent: LinkCardsContentType = {
  services: {
    title: 'Our Services',
    content: 'Find out more about our services and how we can help you',
    button: {
      title: 'View Our Services',
      url: '/services',
    },
  },
  caseStudies: {
    title: 'Case Studies',
    content: 'Find out more about how we helped cleints',
    button: {
      title: 'View Case Studies',
      url: '/case-studies',
    },
  },
  contactUs: {
    title: 'Contact Us',
    content: 'Get in touch to find our how we can help you',
    button: {
      title: 'Get in touch',
      url: '/contact-us',
    },
  },
  insights: {
    title: 'Insights',
    content: 'Read the latest news and insights from our team',
    button: {
      title: 'View Insights',
      url: '/insights',
    },
  },
};

export const PageLinkCard = ({ type }: PageLinkCardProps) => {
  const content: CardContentType = linkCardsContent[type];

  return (
    <div className='bg-mediumblue flex flex-col justify-between items-center py-8 px-12 w-1/2 lg:w-full lg:py-12 lg:px-16 space-y-8 rounded-md'>
      <h3 className='text-chalk'>{content.title}</h3>
      <p className='text-chalk'>{content.content}</p>
      <Button
        title={content.button.title}
        url={content.button.url}
        colour='chalk'
      />
    </div>
  );
};
