// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from './providers/providers';

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
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" id="favicon" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children} 
        </Providers>
      </body>
    </html>
  );
}