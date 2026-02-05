'use client';

import { Button } from '@/components/shared/Button';

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center py-12 space-y-8'>
      <h2 className='mb-0'>Oops...</h2>
      <p>This page doesn`t exist</p>
      <Button colour='mediumblue' title='Return Home' url='/' />
    </div>
  );
}
