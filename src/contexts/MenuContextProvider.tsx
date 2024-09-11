'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

type MenuDrawerContextTypes = {
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

export const MenuDrawerContext = createContext<MenuDrawerContextTypes>({
  isOpen: false,
});

export default function MenuDrawerContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuDrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuDrawerContext.Provider>
  );
}
