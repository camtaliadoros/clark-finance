'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ContactForm } from './ContactForm';

export const ContactUsFormWrapper = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
    >
      <ContactForm buttonColour='dark' />
    </GoogleReCaptchaProvider>
  );
};
