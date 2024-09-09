import { RequiredDocsItem } from '@/app/decision-in-principle/page';
import { Button } from '../shared/Button';
import Image from 'next/image';

type RequiredDocsCardProps = {
  content: RequiredDocsItem;
};

export const RequiredDocsItemCard = ({ content }: RequiredDocsCardProps) => {
  return (
    <div className='flex justify-center md:justify-between md:items-center md:h-12 flex-col md:flex-row w-full'>
      <div className='flex flex-row items-center space-x-2 justify-start w-full'>
        <Image
          src='/images/check.png'
          width={15}
          height={15}
          alt='check icon'
        />
        <h3 className='font-medium text-lg text-ash'>
          {content.required_doc_title}
        </h3>
      </div>
      {content.required_doc_link?.url && (
        <Button
          title={content.required_doc_link?.title}
          url={content.required_doc_link.url}
          target={content.required_doc_link.target}
          colour='mediumblue'
        />
      )}
    </div>
  );
};
