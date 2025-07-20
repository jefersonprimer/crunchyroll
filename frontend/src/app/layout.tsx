import "./globals.css";
import { Providers } from './providers/providers';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
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