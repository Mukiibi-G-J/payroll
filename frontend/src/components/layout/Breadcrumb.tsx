'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbProps {
  className?: string;
  showHome?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ className, showHome = true }, ref) => {
    const pathname = usePathname();

    // Generate breadcrumb items from pathname
    const generateBreadcrumbs = () => {
      const segments = pathname.split('/').filter(Boolean);
      const breadcrumbs = [];

      if (showHome) {
        breadcrumbs.push({
          label: 'Home',
          href: '/',
          icon: Home,
        });
      }

      let currentPath = '';
      segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLast = index === segments.length - 1;

        // Convert segment to readable label
        const label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        breadcrumbs.push({
          label,
          href: currentPath,
          isLast,
        });
      });

      return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    if (breadcrumbs.length <= 1) {
      return null;
    }

    return (
      <nav
        ref={ref}
        className={cn('flex items-center space-x-1 text-sm', className)}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-1">
          {breadcrumbs.map((breadcrumb, index) => {
            const Icon = breadcrumb.icon;
            const isLast = breadcrumb.isLast;

            return (
              <li key={breadcrumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="w-4 h-4 text-bodyText mx-1"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  <span
                    className="text-mainTextColor font-medium"
                    aria-current="page"
                  >
                    {Icon && <Icon className="w-4 h-4 inline mr-1" />}
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className="text-bodyText hover:text-mainTextColor transition-colors flex items-center"
                  >
                    {Icon && <Icon className="w-4 h-4 mr-1" />}
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
