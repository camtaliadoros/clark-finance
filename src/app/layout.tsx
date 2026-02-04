import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MenuDrawerContextProvider from '../contexts/MenuContextProvider';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NavigationEvents } from '@/components/NavigationEvents';
import React, { Suspense } from 'react';
import { MenuDrawer } from '../components/MenuDrawer';
// Validate environment variables at startup
import '@/util/validateEnv';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Clark Finance',
    default: 'Clark Finance',
  },
  description: 'Mortgage & Loan Specialists',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='overflow-x-hidden'>
      <body
        className={`${inter.className} flex flex-col w-screen h-dvh overflow-hidden`}
      >
        <MenuDrawerContextProvider>
          <Header />
          <MenuDrawer />
          <div className='overflow-y-auto'>
            <main className='bg-chalk relative '>{children}</main>
            <Footer />
          </div>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </MenuDrawerContextProvider>
      </body>
      <GoogleAnalytics gaId='G-HFJJXT10RV' />
    </html>
  );
}
