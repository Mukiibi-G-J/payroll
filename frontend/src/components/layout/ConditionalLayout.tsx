'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Layout from './Layout';

interface ConditionalLayoutProps {
  children: ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Don't show landing page header/footer for dashboard or login routes
  const isDashboard = pathname.startsWith('/dashboard');
  const isLogin = pathname.startsWith('/login');

  if (isDashboard || isLogin) {
    return <>{children}</>;
  }

  // Show landing page layout for all other routes
  return <Layout>{children}</Layout>;
}
