import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import MenuDrawerContextProvider from '../contexts/MenuContextProvider';

import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { MenuDrawer } from '../components/MenuDrawer';
import { Suspense } from 'react';
import { NavigationEvents } from '@/components/NavigationEvents';

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
    <MenuDrawerContextProvider>
      <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
        <html lang='en' className='overflow-x-hidden'>
          <body
            className={`${inter.className} flex flex-col w-screen h-dvh overflow-hidden`}
          >
            <Header />
            <MenuDrawer />
            <div className='overflow-y-auto'>
              <main className='bg-chalk relative '>{children}</main>
              <Footer />
            </div>
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
          </body>
        </html>
      </ReCaptchaProvider>
    </MenuDrawerContextProvider>
  );
}
