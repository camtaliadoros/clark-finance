'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import { useContext } from 'react';

export const MenuDrawer = () => {
  const { isOpen } = useContext(MenuDrawerContext);

  return (
    <div
      className={`bg-mediumblue w-full h-full absolute top-0 left-0 opacity-90 transition z-30 ${
        isOpen ? null : 'translate-x-full'
      }`}
    ></div>
  );
};
