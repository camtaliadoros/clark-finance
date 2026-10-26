'use client';
import { loadRecaptcha } from '@/util/recaptcha';

export const ContactUsFormWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // Start loading reCAPTCHA once the visitor interacts with the form, so it
  // doesn't slow the initial page load but is ready by the time they submit
  const preloadRecaptcha = () => {
    loadRecaptcha().catch(() => {
      // Retried on submit
    });
  };

  return (
    <div
      className='contents'
      onFocusCapture={preloadRecaptcha}
      onPointerEnter={preloadRecaptcha}
      onTouchStart={preloadRecaptcha}
    >
      {children}
    </div>
  );
};
