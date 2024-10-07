'use client';

import { Page } from '@/util/models';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

type MenuDrawerContextTypes = {
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  menuItems: MenuItems;
  setMenuItems?: Dispatch<SetStateAction<MenuItems>>;
};

type MenuItems = {
  mainPages: Page[];
  servicePages: Page[];
};

export const MenuDrawerContext = createContext<MenuDrawerContextTypes>({
  isOpen: false,
  menuItems: {
    mainPages: [],
    servicePages: [],
  },
});

export default function MenuDrawerContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItems>({
    mainPages: [],
    servicePages: [],
  });

  return (
    <MenuDrawerContext.Provider
      value={{ isOpen, setIsOpen, menuItems, setMenuItems }}
    >
      {children}
    </MenuDrawerContext.Provider>
  );
}
