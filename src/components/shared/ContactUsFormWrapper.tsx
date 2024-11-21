'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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
