'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useRef } from 'react';

export const SubMenu = () => {
  const { menuItems } = useContext(MenuDrawerContext);

  // Order submenu items

  const sortedItems = menuItems.servicePages.toSorted(
    (a, b) =>
      a.acf.service_card.homepage_order - b.acf.service_card.homepage_order
  );

  const pathname = usePathname();

  return (
    <>
      {sortedItems.map((page) => (
        <Link
          href={`/services/${page.slug}`}
          className={`text-chalk text-xl font-semibold no-underline hover:opacity-75 transition py-1 ${
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
