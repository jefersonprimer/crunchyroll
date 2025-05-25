'use client';

import React from 'react';

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 