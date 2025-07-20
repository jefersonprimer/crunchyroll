import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const fallbackLocale = 'en';
  const currentLocale = locale || fallbackLocale;

  return {
    locale: currentLocale,
    messages: (await import(`./locale/${currentLocale}.json`)).default
  };
}); 