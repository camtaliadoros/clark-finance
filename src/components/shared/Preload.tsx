'use client';

import { preload, PreloadOptions } from 'react-dom';

type PreloadProps = PreloadOptions & {
  href: string;
};

// Preloads must be called from a client component to be emitted in <head>.
// Called from a server component they arrive late, in the streamed body.
export const Preload = ({ href, ...options }: PreloadProps) => {
  preload(href, options);
  return null;
};
