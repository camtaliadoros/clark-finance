'use client';

import { Page } from '@/util/models';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SubMenu } from './SubMenu';

type MenuItemProps = {
  pageData: Page;
};

export const MenuItem = ({ pageData }: MenuItemProps) => {
  const pathname = usePathname();

  if (pageData.slug === 'services') {
    return (
      <>
        <Link
          href={`/${pageData.slug}`}
          className={`flex gap-2 items-center text-chalk text-2xl 2xl:text-3xl font-semibold no-underline hover:opacity-75 transition py-4 ${
            pathname === `/${pageData.slug}`
              ? 'text-yellow cursor-pointer pointer-events-none'
              : null
          }`}
          prefetch={true}
        >
          {pageData.acf.page_title}
        </Link>

        <div
          className={`bg-navy shrink-0 bg-opacity-50 w-full flex flex-col items-center justify-center  `}
        >
          <SubMenu />
        </div>
      </>
    );
  } else {
    return (
      <Link
        href={`/${pageData.slug}`}
        className={`text-chalk text-2xl 2xl:text-3xl font-semibold no-underline hover:opacity-75 transition py-4 ${
          pathname === `/${pageData.slug}`
            ? 'text-yellow cursor-pointer pointer-events-none'
            : null
        }`}
        key={pageData.id}
        prefetch={true}
      >
        {pageData.acf.page_title}
      </Link>
    );
  }
};
