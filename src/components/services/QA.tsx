'use client';

import { convertWysywyg } from '@/util/utilFunctions';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ElementRef, useRef, useState } from 'react';

type QAProps = {
  question: string | undefined;
  answer: string | undefined;
};

export const QA = ({ question, answer }: QAProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<ElementRef<'div'>>(null);

  const sanitisedContent = answer ? convertWysywyg(answer) : '';

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <button
        className='flex w-full border-b py-4 border-chalk items-center space-x-6'
        onClick={handleClick}
      >
        <span className='text-chalk text-left font-semibold  w-full mb-0 text-sm 2xl:text-xl'>
          {question}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          size='sm'
          className={`text-chalk text-sm ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } transition duration-300 2xl:text-2xl`}
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
          className='text-chalk m-8 [&>p]:text-sm [&>p]:text-chalk 2xl:text-xl '
          dangerouslySetInnerHTML={{ __html: sanitisedContent }}
        />
      </div>
    </div>
  );
};
