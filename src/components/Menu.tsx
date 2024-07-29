'use client';

import { useState } from 'react';
import '../app/globals.css';

export const Menu = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <div
      className={`nav-icon ${open ? 'open' : null}`}
      onClick={() => setIsOpen((prevState) => !prevState)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
