'use client';

import { MenuDrawerContext } from '@/contexts/MenuContextProvider';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';

export function NavigationEvents() {
  const pathname = usePathname();

  const { setIsOpen } = useContext(MenuDrawerContext);

  useEffect(() => {
    setIsOpen?.(false);
  }, [pathname, setIsOpen]);

  return <></>;
}
