'use client';

import { convertWysywyg } from '@/util/utilFunctions';
import { useRef, useState } from 'react';

type QAProps = {
  question: string;
  answer: string;
};

export const QA = ({ question, answer }: QAProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef(null);

  const sanitisedContent = convertWysywyg(answer);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <button className='flex w-full' onClick={handleClick}>
        <h5 className='text-chalk text-left font-semibold border-b py-2 border-chalk w-full'>
          {question}
        </h5>
      </button>
      <div
        className={` bg-mediumblue rounded-sm bg-opacity-20 overflow-hidden  
        transition-all duration-500`}
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className='text-chalk m-8'
          dangerouslySetInnerHTML={{ __html: sanitisedContent }}
        />
      </div>
    </div>
  );
};
