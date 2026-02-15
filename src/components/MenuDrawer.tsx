'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import { fetchMenuItems } from '@/util/utilFunctions';
import { useContext, useEffect } from 'react';
import { MenuItem } from './MenuItems';

type MenuItem = {
  slug: string;
  parent: number;
  id: number;
  acf: MenuLocation;
};

type MenuLocation = {
  menu_location: string[];
  menu_position: number;
  service_card: SubMenuOrder;
  page_title: string;
};

type SubMenuOrder = {
  homepage_order: number;
};

export const MenuDrawer = () => {
  const { isOpen, menuItems, setMenuItems } = useContext(MenuDrawerContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: MenuItem[] = await fetchMenuItems();

        const mainMenuPages = data.filter((page) =>
          page.acf.menu_location.includes('Main Menu')
        );

        const menuPages = mainMenuPages.filter((page) => page.slug !== 'home');
        const parentPages = menuPages.filter((page) => page.parent === 0);
        const subPages = menuPages.filter((page) => page.parent !== 0);

        const sortedParentPages = parentPages.toSorted((a, b) => {
          return Number(a.acf.menu_position) - Number(b.acf.menu_position);
        });

        const sortedSubPages = subPages.toSorted((a, b) => {
          return (
            a.acf.service_card.homepage_order - b.acf.service_card.homepage_order
          );
        });

        const menuItems = {
          mainPages: sortedParentPages,
          servicePages: sortedSubPages,
        };

        setMenuItems?.(menuItems);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };

    fetchData();
  }, [setMenuItems]);

  return (
    <div
      className={`bg-mediumblue w-full h-full absolute  top-0 left-0 opacity-95  transition  z-30 flex flex-col items-center justify-start pt-48 overflow-y-auto ${
        isOpen ? 'max-w-full' : 'max-w-0 translate-x-full'
      }`}
    >
      {menuItems?.mainPages.map((page) => (
        <MenuItem key={page.id} pageData={page} />
      ))}
    </div>
  );
};
