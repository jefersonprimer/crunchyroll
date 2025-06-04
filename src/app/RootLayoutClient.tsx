'use client';

import { usePathname } from 'next/navigation';
import ClientLayout from './ClientLayout';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If the current path is /news, render children directly without the root layout
  if (pathname?.startsWith('/news')) {
    return <>{children}</>;
  }

  // For all other routes, wrap with ClientLayout
  return <ClientLayout>{children}</ClientLayout>;
} 