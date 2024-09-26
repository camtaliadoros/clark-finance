'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

type PaginationProps = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const router = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleShowMore = () => {
    const pageNumber = currentPage + 1;
    const url = createPageURL(pageNumber);
    router.replace(url);
  };

  const handleShowLess = () => {
    const pageNumber = currentPage - 1;
    const url = createPageURL(pageNumber);
    router.replace(url);
  };

  return (
    <div className='flex items-center space-x-2'>
      <button
        onClick={handleShowLess}
        disabled={currentPage === 1}
        className='disabled:opacity-25'
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          size='sm'
          className='text-mediumblue '
        />
      </button>
      <h5 className='mb-0 text-mediumblue'>{currentPage}</h5>
      <button
        onClick={handleShowMore}
        disabled={currentPage.toString() === totalPages.toString()}
        className='disabled:opacity-25'
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          size='sm'
          className='text-mediumblue'
        />
      </button>
    </div>
  );
};
