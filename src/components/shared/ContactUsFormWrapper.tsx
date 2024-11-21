'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ContactForm } from './ContactForm';

export const ContactUsFormWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};
