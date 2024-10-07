'use client';

import { Page } from '@/util/models';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { SubMenu } from './SubMenu';

type MenuItemProps = {
  pageData: Page;
};

export const MenuItem = ({ pageData }: MenuItemProps) => {
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);

  const pathname = usePathname();

  const handleClick = () => {
    setSubmenuIsOpen((prevState) => !prevState);
  };

  if (pageData.slug === 'services') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`flex gap-2 items-center text-chalk text-2xl font-semibold no-underline hover:opacity-75 transition ${
            pathname === `/${pageData.slug}`
              ? 'text-yellow cursor-pointer pointer-events-none'
              : null
          }`}
        >
          {pageData.acf.page_title}
          <FontAwesomeIcon
            className={`text-chalk text-lg ${
              submenuIsOpen ? 'rotate-180' : 'rotate-0'
            } transition duration-300`}
            icon={faChevronDown}
          />
        </button>
        {submenuIsOpen && <SubMenu />}
      </>
    );
  } else {
    return (
      <Link
        href={`/${pageData.slug}`}
        className={`text-chalk text-2xl font-semibold no-underline hover:opacity-75 transition ${
          pathname === `/${pageData.slug}`
            ? 'text-yellow cursor-pointer pointer-events-none'
            : null
        }`}
        key={pageData.id}
      >
        {pageData.acf.page_title}
      </Link>
    );
  }
};
