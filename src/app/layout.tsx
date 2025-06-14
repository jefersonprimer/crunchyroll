import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Providers } from './providers';
import { DropdownProvider } from "./context/DropdownContext";
import RootLayoutClient from "./RootLayoutClient";

export const metadata: Metadata = {
  title: "Crunchyroll - Assista a Animes, Jogue Games e Compre Online",
  description: "create by primerdev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/3357695.webp" id="favicon" />
      </head>
      <body suppressHydrationWarning>
        <DropdownProvider>
          <Providers>
            <ClientBody>
              <RootLayoutClient>{children}</RootLayoutClient>
            </ClientBody>
          </Providers>
        </DropdownProvider>
      </body>
    </html>
  );
}
