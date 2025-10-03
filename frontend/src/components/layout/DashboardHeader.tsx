import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  Bell,
  User,
  Menu,
  LogOut,
  Settings,
  HelpCircle,
} from 'lucide-react';

export interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  onMenuToggle?: () => void;
  className?: string;
}

const DashboardHeader = React.forwardRef<HTMLDivElement, DashboardHeaderProps>(
  (
    {
      title = 'Dashboard',
      subtitle,
      showSearch = true,
      showNotifications = true,
      showUserMenu = true,
      onMenuToggle,
      className,
    },
    ref
  ) => {
    const router = useRouter();
    const { state, logout } = useAuth();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          userMenuRef.current &&
          !userMenuRef.current.contains(event.target as Node)
        ) {
          setUserMenuOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
      logout();
      router.push('/login');
    };

    const handleProfileClick = () => {
      setUserMenuOpen(false);
      router.push('/dashboard/profile');
    };

    const handleSettingsClick = () => {
      setUserMenuOpen(false);
      router.push('/dashboard/settings');
    };

    return (
      <header
        ref={ref}
        className={cn(
          'flex h-16 items-center justify-between bg-white border-b border-strokeColor px-6',
          className
        )}
        role="banner"
      >
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-softBg transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-s2 focus:ring-offset-2"
            aria-label="Toggle menu"
            aria-expanded="false"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-mainTextColor">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-bodyText">{subtitle}</p>}
          </div>
        </div>

        {/* Center - Search */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bodyText" />
              <input
                type="text"
                placeholder="Search employees, payroll, reports..."
                className="w-full pl-10 pr-4 py-2 border border-strokeColor rounded-lg focus:outline-none focus:ring-2 focus:ring-s2 focus:border-s2"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                aria-label="Search employees, payroll, reports"
              />
            </div>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search button for mobile */}
          {showSearch && (
            <button
              className="p-2 rounded-lg hover:bg-softBg transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-s2 focus:ring-offset-2"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Notifications */}
          {showNotifications && (
            <button
              className="relative p-2 rounded-lg hover:bg-softBg transition-colors focus:outline-none focus:ring-2 focus:ring-s2 focus:ring-offset-2"
              aria-label="Notifications"
              aria-describedby="notification-count"
            >
              <Bell className="w-5 h-5" />
              <span
                id="notification-count"
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                aria-label="3 unread notifications"
              ></span>
            </button>
          )}

          {/* User menu */}
          {showUserMenu && (
            <div className="relative" ref={userMenuRef}>
              <button
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-softBg transition-colors focus:outline-none focus:ring-2 focus:ring-s2 focus:ring-offset-2"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User menu"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-mainTextColor">
                    {state.user && state.isAuthenticated
                      ? `${state.user.firstName} ${state.user.lastName}`
                      : 'User'}
                  </p>
                  <p className="text-xs text-bodyText">
                    {state.user && state.isAuthenticated
                      ? state.user.position
                      : 'Role'}
                  </p>
                </div>
                <div className="w-8 h-8 bg-softBg rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-mainTextColor" />
                </div>
              </button>

              {/* User dropdown menu */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-strokeColor rounded-lg shadow-lg z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-1">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-mainTextColor hover:bg-softBg transition-colors"
                      role="menuitem"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={handleSettingsClick}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-mainTextColor hover:bg-softBg transition-colors"
                      role="menuitem"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-mainTextColor hover:bg-softBg transition-colors"
                      role="menuitem"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Help & Support
                    </button>
                    <div className="border-t border-strokeColor my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    );
  }
);
DashboardHeader.displayName = 'DashboardHeader';

export { DashboardHeader };
