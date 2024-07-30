'use client';

import { useState } from 'react';
import '../app/globals.css';
import { MenuDrawer } from './MenuDrawer';

export const Menu = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <MenuDrawer isOpen={open} />
      <button
        className={`nav-icon relative ${open ? 'open' : null}`}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};
