"use client";

import { NextIntlClientProvider } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Messages = {
  [key: string]: Record<string, any>;
};

const mergeMessages = (messages: Messages) => {
  const merged: Record<string, any> = {};
  
  Object.entries(messages).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      merged[key] = value;
    }
  });
  
  return merged;
};

export default function NextIntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as string;
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Dynamically import all translation files
        const homeMessages = await import(`../../messages/${locale}/home.json`);
        const videosMessages = await import(`../../messages/${locale}/videos.json`);
        const simulcastsMessages = await import(`../../messages/${locale}/simulcasts.json`);
        const headerMessages = await import(`../../messages/${locale}/header.json`);
        const footerMessages = await import(`../../messages/${locale}/footer.json`);
        const animecardMessages = await import(`../../messages/${locale}/animecard.json`);
        const carouselMessages = await import(`../../messages/${locale}/carousel.json`);
        const buttonsMessages = await import(`../../messages/${locale}/buttons.json`);
        const modalsMessages = await import(`../../messages/${locale}/modals.json`);
        const seriesMessages = await import(`../../messages/${locale}/series.json`);
        const watchMessages = await import(`../../messages/${locale}/watch.json`);
        const searchMessages = await import(`../../messages/${locale}/search.json`);
        const watchlistMessages = await import(`../../messages/${locale}/watchlist.json`);
        const crunchylistMessages = await import(`../../messages/${locale}/crunchylist.json`);
        const historyMessages = await import(`../../messages/${locale}/history.json`);
        const simulcastcalendarMessages = await import(`../../messages/${locale}/simulcastcalendar.json`);
        
        const allMessages = {
          ...homeMessages.default,
          ...videosMessages.default,
          ...simulcastsMessages.default,
          ...headerMessages.default,
          ...footerMessages.default,
          ...animecardMessages.default,
          ...carouselMessages.default,
          ...buttonsMessages.default,
          ...modalsMessages.default,
          ...seriesMessages.default,
          ...watchMessages.default,
          ...searchMessages.default,
          ...watchlistMessages.default,
          ...crunchylistMessages.default,
          ...historyMessages.default,
          ...simulcastcalendarMessages.default
        };

        // Merge messages while preserving the structure needed by components
        const mergedMessages = mergeMessages(allMessages);
        setMessages(mergedMessages);
      } catch (error) {
        console.error(`Error loading messages for locale ${locale}:`, error);
      }
    };

    loadMessages();
  }, [locale]);

  if (Object.keys(messages).length === 0) {
    return null; // or a loading spinner
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 