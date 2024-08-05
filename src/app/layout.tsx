import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import MenuDrawerContextProvider from './contexts/MenuContextProvider';
import { MenuDrawer } from '@/components/MenuDrawer';
import { ReCaptchaProvider } from 'next-recaptcha-v3';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
            className={`${inter.className} w-screen relative overflow-x-hidden`}
          >
            <Header />
            <MenuDrawer />
            <main className='bg-chalk mt-16 lg:mt-20 '>{children}</main>
            <Footer />
          </body>
        </html>
      </ReCaptchaProvider>
    </MenuDrawerContextProvider>
  );
}
