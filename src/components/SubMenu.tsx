'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useRef } from 'react';

export const SubMenu = () => {
  const { menuItems } = useContext(MenuDrawerContext);

  const pathname = usePathname();

  return (
    <>
      {menuItems.servicePages.map((page) => (
        <Link
          href={`/services/${page.slug}`}
          className={`text-chalk text-xl font-semibold no-underline hover:opacity-75 transition ${
            pathname === `/services/${page.slug}`
              ? 'text-yellow cursor-pointer pointer-events-none'
              : null
          }`}
          key={page.id}
        >
          {page.acf.page_title}
        </Link>
      ))}
    </>
  );
};
