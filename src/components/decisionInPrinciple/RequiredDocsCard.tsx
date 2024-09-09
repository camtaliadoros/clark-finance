import { RequiredDocsItem } from '@/app/decision-in-principle/page';
import { Button } from '../shared/Button';
import Image from 'next/image';

type RequiredDocsCardProps = {
  content: RequiredDocsItem;
};

export const RequiredDocsItemCard = ({ content }: RequiredDocsCardProps) => {
  return (
    <div className='flex justify-between items-center bg-lightblue bg-opacity-15 rounded-md p-4'>
      <div className='flex items-center space-x-2'>
        <Image
          src='/images/check.png'
          width={15}
          height={15}
          alt='check icon'
        />
        <h3 className='text-center font-medium text-lg'>
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
