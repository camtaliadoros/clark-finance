'use client';
import { useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export const ContactUsFormWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // Only load the reCAPTCHA script once the visitor interacts with the form,
  // so it doesn't block the initial page load. The provider loads the script
  // as soon as it receives a key.
  const [isActive, setIsActive] = useState(false);
  const activate = () => setIsActive(true);

  return (
    <div
      className='contents'
      onFocusCapture={activate}
      onPointerEnter={activate}
      onTouchStart={activate}
    >
      <GoogleReCaptchaProvider
        reCaptchaKey={
          isActive ? (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string) : ''
        }
      >
        {children}
      </GoogleReCaptchaProvider>
    </div>
  );
};
