import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { use } from "react";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });
const locales = ["en", "pt-br", "es"];

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params); 

  if (!locales.includes(locale)) {
    notFound();
  }

  async function getMessages(currentLocale: string) {
    try {
      const messages = await import(`../../locale/${currentLocale}.json`);
      return messages.default || messages;
    } catch (error) {
      console.error(`Erro ao carregar mensagens para o locale ${currentLocale}:`, error);
      return {};
    }
  }

  const messages = use(getMessages(locale));

  return (
    <div className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}