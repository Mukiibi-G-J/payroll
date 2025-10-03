'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { Breadcrumb } from './Breadcrumb';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  className?: string;
}

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  (
    {
      children,
      title,
      subtitle,
      showSearch = true,
      showNotifications = true,
      showUserMenu = true,
      className,
    },
    ref
  ) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarCollapsed(!sidebarCollapsed);
    };

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
      <div ref={ref} className={cn('flex h-screen bg-softBg', className)}>
        {/* Sidebar */}
        <div className={cn('hidden lg:flex', mobileMenuOpen && 'lg:hidden')}>
          <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </div>

        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <div
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <Sidebar collapsed={false} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader
            title={title}
            subtitle={subtitle}
            showSearch={showSearch}
            showNotifications={showNotifications}
            showUserMenu={showUserMenu}
            onMenuToggle={toggleMobileMenu}
          />

          {/* Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {/* Breadcrumb Navigation */}
              <div className="mb-4">
                <Breadcrumb />
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }
);
DashboardLayout.displayName = 'DashboardLayout';

export { DashboardLayout };
