import { WhyChooseUsItem } from '@/app/about-us/page';

type WhyChooseUsCardProps = {
  content: WhyChooseUsItem;
};

export const WhyChooseUsCard = ({ content }: WhyChooseUsCardProps) => {
  return (
    <div className='grid grid-cols-5 w-96 bg-lightblue bg-opacity-25 rounded p-12 hover:bg-opacity-50 transition'>
      <div className=''>icon goes here</div>
      <div className='col-span-4 flex flex-col'>
        <h5 className='text-chalk font-semibold text-3xl'>
          {content.why_choose_us_item_title}
        </h5>
        <div className='flex flex-col gap-2'>
          <p className='text-chalk'>{content.why_choose_us_item_description}</p>
          <p className='text-chalk text-xs'>
            {content.why_choose_us_item_note}
          </p>
        </div>
      </div>
    </div>
  );
};
