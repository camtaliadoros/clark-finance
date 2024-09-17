'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import { Page } from '@/util/models';
import { fetchMenuItems } from '@/util/utilFunctions';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export const MenuDrawer = () => {
  const { isOpen } = useContext(MenuDrawerContext);
  const [menuPages, setMenuPages] = useState<Page[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data: Page[] = await fetchMenuItems();
      const mainMenuPages = data.filter(
        (page) => page.acf.menu_location === 'Main Menu'
      );
      setMenuPages(mainMenuPages);
    };

    fetchData();
  }, []);

  return (
    <div
      className={`bg-mediumblue w-full h-full absolute top-0 left-0 opacity-90 transition z-30 flex flex-col items-center justify-center ${
        isOpen ? null : 'translate-x-full'
      }`}
    >
      {menuPages?.map((page) => (
        <Link
          href={`/${page.slug}`}
          className='text-chalk relative z-40'
          key={page.id}
        >
          {page.acf.page_title}
        </Link>
      ))}{' '}
    </div>
  );
};
