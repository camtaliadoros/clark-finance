'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import { Page } from '@/util/models';
import { fetchMenuItems } from '@/util/utilFunctions';
import { useContext, useEffect } from 'react';
import { MenuItem } from './MenuItems';

export const MenuDrawer = () => {
  const { isOpen, menuItems, setMenuItems } = useContext(MenuDrawerContext);

  useEffect(() => {
    const fetchData = async () => {
      const data: Page[] = await fetchMenuItems();

      const mainMenuPages = data.filter((page) =>
        page.acf.menu_location.includes('Main Menu')
      );

      const menuPages = mainMenuPages.filter((page) => page.slug !== 'home');
      const parentPages = menuPages.filter((page) => page.parent === 0);
      const subPages = menuPages.filter((page) => page.parent !== 0);

      const sortedParentPages = parentPages.toSorted((a, b) => {
        return a.acf.menu_position - b.acf.menu_position;
      });

      const sortedSubPages = subPages.toSorted((a, b) => {
        return a.acf.menu_position - b.acf.menu_position;
      });

      const menuItems = {
        mainPages: sortedParentPages,
        servicePages: sortedSubPages,
      };

      setMenuItems?.(menuItems);
    };

    fetchData();
  }, [setMenuItems]);

  return (
    <div
      className={`bg-mediumblue w-full h-full absolute top-0 left-0 opacity-95 transition z-30 flex flex-col items-center justify-start pt-48 ${
        isOpen ? null : 'translate-x-full'
      }`}
    >
      {menuItems?.mainPages.map((page) => (
        <MenuItem key={page.id} pageData={page} />
      ))}
    </div>
  );
};
