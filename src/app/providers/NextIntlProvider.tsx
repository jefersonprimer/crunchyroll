"use client";

import { NextIntlClientProvider } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NextIntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as string;
  const [messages, setMessages] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await import(`../../locale/${locale}.json`);
        setMessages(messages.default || messages);
      } catch (error) {
        console.error(`Error loading messages for locale ${locale}:`, error);
        setMessages(null);
      }
    };

    loadMessages();
  }, [locale]);

  if (!messages) {
    return null; // ou um spinner de loading
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 