import { Inter } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { use } from "react";
import NextIntlProvider from "../providers/NextIntlProvider";

const inter = Inter({ subsets: ["latin"] });

// List of all supported locales
const locales = ["en", "pt-br", "es"];

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return (
    <div className={inter.className}>
      <NextIntlProvider>{children}</NextIntlProvider>
    </div>
  );
} 