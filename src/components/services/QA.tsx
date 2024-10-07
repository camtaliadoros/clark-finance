'use client';

import { convertWysywyg } from '@/util/utilFunctions';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ElementRef, useRef, useState } from 'react';

type QAProps = {
  question: string;
  answer: string;
};

export const QA = ({ question, answer }: QAProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<ElementRef<'div'>>(null);

  const sanitisedContent = convertWysywyg(answer);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <button
        className='flex w-full border-b py-4 border-chalk items-center space-x-6'
        onClick={handleClick}
      >
        <h5 className='text-chalk text-left font-semibold  w-full mb-0 text-base'>
          {question}
        </h5>
        <FontAwesomeIcon
          icon={faChevronDown}
          size='sm'
          className={`text-chalk text-base ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } transition duration-300`}
        />
      </button>
      <div
        className={` bg-lightblue rounded-sm bg-opacity-20 overflow-hidden  
        transition-all duration-300`}
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className='text-chalk m-8 text-sm'
          dangerouslySetInnerHTML={{ __html: sanitisedContent }}
        />
      </div>
    </div>
  );
};
