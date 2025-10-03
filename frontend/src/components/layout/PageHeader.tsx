import React from 'react';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, subtitle, breadcrumb, actions, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-white border-b border-strokeColor', className)}
      >
        <div className="px-6 py-4">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <Breadcrumb items={breadcrumb} className="mb-4" />
          )}

          {/* Header content */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-mainTextColor">
                {title}
              </h1>
              {subtitle && <p className="text-bodyText mt-1">{subtitle}</p>}
            </div>

            {/* Actions */}
            {actions && (
              <div className="flex items-center gap-3">{actions}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
PageHeader.displayName = 'PageHeader';

export { PageHeader };


