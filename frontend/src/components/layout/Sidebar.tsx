'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import {
  Users,
  Calculator,
  Clock,
  BarChart3,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

// Navigation items with role-based permissions
const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    permissions: ['read:all', 'read:own'],
    roles: ['hr_manager', 'payroll_admin', 'business_owner', 'employee'],
  },
  {
    name: 'Employees',
    href: '/dashboard/employees',
    icon: Users,
    permissions: ['read:all', 'read:employees'],
    roles: ['hr_manager', 'payroll_admin'],
  },
  {
    name: 'Payroll',
    href: '/dashboard/payroll',
    icon: Calculator,
    permissions: ['read:payroll', 'write:payroll'],
    roles: ['hr_manager', 'payroll_admin'],
  },
  {
    name: 'Time Tracking',
    href: '/dashboard/time-tracking',
    icon: Clock,
    permissions: ['read:all', 'read:own', 'write:own_timesheet'],
    roles: ['hr_manager', 'payroll_admin', 'employee'],
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: BarChart3,
    permissions: ['read:reports', 'read:analytics'],
    roles: ['hr_manager', 'payroll_admin', 'business_owner'],
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    permissions: ['admin:all', 'admin:settings'],
    roles: ['hr_manager', 'business_owner'],
  },
];

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ collapsed = false, onToggle, className }, ref) => {
    const pathname = usePathname();
    const { state, hasPermission, hasRole } = useAuth();

    // Filter navigation items based on user permissions and role
    const filteredNavigationItems = navigationItems.filter(item => {
      if (!state.user) return false;

      const hasRequiredPermission = item.permissions.some(permission =>
        hasPermission(permission)
      );
      const hasRequiredRole = item.roles.some(role => hasRole(role));

      return hasRequiredPermission || hasRequiredRole;
    });

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full flex-col bg-white border-r border-strokeColor transition-all duration-300',
          collapsed ? 'w-16' : 'w-64',
          className
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-strokeColor">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-s1 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-mainTextColor">AccuPay</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-softBg transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 px-4 py-6 space-y-2"
          role="navigation"
          aria-label="Main navigation"
        >
          {filteredNavigationItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-s2 focus:ring-offset-2',
                  isActive
                    ? 'bg-s1 text-white'
                    : 'text-bodyText hover:bg-softBg hover:text-mainTextColor',
                  collapsed && 'justify-center'
                )}
                aria-current={isActive ? 'page' : undefined}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = item.href;
                  }
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {!collapsed && <span>{item.name}</span>}
                {collapsed && <span className="sr-only">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-strokeColor">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-softBg rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-mainTextColor">
                {state.user && state.isAuthenticated
                  ? `${state.user.firstName[0]}${state.user.lastName[0]}`
                  : 'U'}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-mainTextColor truncate">
                  {state.user && state.isAuthenticated
                    ? `${state.user.firstName} ${state.user.lastName}`
                    : 'User'}
                </p>
                <p className="text-xs text-bodyText truncate">
                  {state.user && state.isAuthenticated
                    ? state.user.position
                    : 'Role'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export { Sidebar };
