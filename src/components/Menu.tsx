'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import { useContext } from 'react';
import '../app/globals.css';

export const Menu = () => {
  const { isOpen, setIsOpen } = useContext(MenuDrawerContext);

  return (
    <>
      <button
        className={`nav-icon relative ${isOpen ? 'open' : null} z-50`}
        onClick={() => setIsOpen?.((prevState) => !prevState)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};
