import { useEffect, useRef } from 'react';

// Focus management hook
export const useFocusManagement = () => {
  const focusableElements = useRef<HTMLElement[]>([]);

  const getFocusableElements = (container: HTMLElement) => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(
      container.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
  };

  const trapFocus = (container: HTMLElement) => {
    focusableElements.current = getFocusableElements(container);
    const firstElement = focusableElements.current[0];
    const lastElement =
      focusableElements.current[focusableElements.current.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  };

  return { trapFocus, getFocusableElements };
};

// Announce changes to screen readers
export const useAnnouncer = () => {
  const announcerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Create or get the announcer element
    let announcer = document.getElementById('aria-live-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'aria-live-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.left = '-10000px';
      announcer.style.width = '1px';
      announcer.style.height = '1px';
      announcer.style.overflow = 'hidden';
      document.body.appendChild(announcer);
    }
    announcerRef.current = announcer;
  }, []);

  const announce = (
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    if (announcerRef.current) {
      announcerRef.current.setAttribute('aria-live', priority);
      announcerRef.current.textContent = message;
    }
  };

  return { announce };
};

// Keyboard navigation hook
export const useKeyboardNavigation = (
  onEscape?: () => void,
  onEnter?: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
      if (e.key === 'Enter' && onEnter) {
        onEnter();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onEnter]);
};

// ARIA attributes helper
export const getAriaAttributes = (props: {
  label?: string;
  describedBy?: string;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
}) => {
  const attributes: Record<string, string | boolean> = {};

  if (props.label) attributes['aria-label'] = props.label;
  if (props.describedBy) attributes['aria-describedby'] = props.describedBy;
  if (props.expanded !== undefined)
    attributes['aria-expanded'] = props.expanded;
  if (props.selected !== undefined)
    attributes['aria-selected'] = props.selected;
  if (props.disabled) attributes['aria-disabled'] = props.disabled;
  if (props.required) attributes['aria-required'] = props.required;
  if (props.invalid) attributes['aria-invalid'] = props.invalid;

  return attributes;
};


