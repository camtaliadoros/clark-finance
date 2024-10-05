'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import { Page, Service, ServicePageContent } from '@/util/models';
import { fetchMenuItems } from '@/util/utilFunctions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

type MenuItems = {
  mainPages: Page[];
  servicePages: Service[];
};

export const MenuDrawer = () => {
  const { isOpen } = useContext(MenuDrawerContext);
  const [menuPages, setMenuPages] = useState<MenuItems>();

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const data: Page[] = await fetchMenuItems();

      const mainMenuPages = data.filter((page) =>
        page.acf.menu_location.includes('Main Menu')
      );

      const sortedPages = mainMenuPages.toSorted((a, b) => {
        return a.acf.menu_position - b.acf.menu_position;
      });

      // const servicePagesData = await fetch(
      //   `${process.env.NEXT_PUBLIC_HOST_URL}/services/api/fetchAllServices`,
      //   {
      //     // next: {
      //     //   revalidate: 10,
      //     // },
      //     cache: 'no-store',
      //   }
      // );

      // const servicePages: Service[] = await servicePagesData.json();

      // const sortedServices = servicePages.toSorted((a, b) => {
      //   return a.acf.homepage_order - b.acf.homepage_order;
      // });

      const menuItems = {
        mainPages: sortedPages,
        servicePages: [],
      };

      setMenuPages(menuItems);
    };

    fetchData();
  }, []);

  return (
    <div
      className={`bg-mediumblue w-full h-full absolute top-0 left-0 opacity-95 transition z-30 flex flex-col items-center justify-center space-y-8 ${
        isOpen ? null : 'translate-x-full'
      }`}
    >
      {menuPages?.mainPages.map((page, i) => (
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
      ))}
    </div>
  );
};
