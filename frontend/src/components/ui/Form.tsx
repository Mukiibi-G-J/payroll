import React from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, helperText, required, children, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {label && (
          <label className="block text-sm font-medium text-s1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {children}
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-bodyText">{helperText}</p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

const FormGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-6', className)} {...props} />
));
FormGroup.displayName = 'FormGroup';

const FormRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grid grid-cols-12 gap-6', className)}
    {...props}
  />
));
FormRow.displayName = 'FormRow';

const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    description?: string;
  }
>(({ className, title, description, children, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-6', className)} {...props}>
    {(title || description) && (
      <div className="space-y-2">
        {title && <h3 className="text-xl font-semibold text-s1">{title}</h3>}
        {description && <p className="text-sm text-bodyText">{description}</p>}
      </div>
    )}
    {children}
  </div>
));
FormSection.displayName = 'FormSection';

const FormActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex justify-end gap-3 pt-6', className)}
    {...props}
  />
));
FormActions.displayName = 'FormActions';

export { FormField, FormGroup, FormRow, FormSection, FormActions };


