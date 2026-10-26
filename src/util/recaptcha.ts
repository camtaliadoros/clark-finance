const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

// Load the reCAPTCHA v3 script once, on demand
export const loadRecaptcha = () => {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.onload = () => window.grecaptcha?.ready(() => resolve());
      script.onerror = () => {
        // Allow a retry on the next attempt
        scriptPromise = null;
        script.remove();
        reject(new Error('Failed to load reCAPTCHA'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
};

export const getRecaptchaToken = async (action: string) => {
  await loadRecaptcha();
  if (!window.grecaptcha) {
    throw new Error('reCAPTCHA not available');
  }
  return window.grecaptcha.execute(siteKey, { action });
};
