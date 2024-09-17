'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import { Page } from '@/util/models';
import { fetchMenuItems } from '@/util/utilFunctions';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export const MenuDrawer = () => {
  const { isOpen } = useContext(MenuDrawerContext);
  const [menuPages, setMenuPages] = useState<Page[]>();

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const data: Page[] = await fetchMenuItems();
      const mainMenuPages = data.filter((page) =>
        page.acf.menu_location.includes('Main Menu')
      );

      const sortedPages = mainMenuPages.sort((a, b) => {
        return a.acf.menu_position - b.acf.menu_position;
      });
      setMenuPages(sortedPages);
    };

    fetchData();
  }, []);

  console.log('pathname is ' + pathname);

  return (
    <div
      className={`bg-mediumblue w-full h-full absolute top-0 left-0 opacity-90 transition z-30 flex flex-col items-center justify-center space-y-8 ${
        isOpen ? null : 'translate-x-full'
      }`}
    >
      {menuPages?.map((page) => (
        <Link
          href={`/${page.slug}`}
          className={`text-chalk text-2xl font-semibold no-underline hover:opacity-75 transition ${
            pathname === `/${page.slug}`
              ? 'text-yellow cursor-pointer pointer-events-none'
              : null
          }`}
          key={page.id}
        >
          {page.acf.page_title}
        </Link>
      ))}{' '}
    </div>
  );
};
