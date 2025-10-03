// Accessibility utilities for the dashboard

// Generate unique IDs for ARIA relationships
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Screen reader only text
export const srOnly = 'sr-only';

// Focus management utilities
export const focusFirstElement = (container: HTMLElement) => {
  const focusableElements = getFocusableElements(container);
  focusableElements[0]?.focus();
};

export const focusLastElement = (container: HTMLElement) => {
  const focusableElements = getFocusableElements(container);
  focusableElements[focusableElements.length - 1]?.focus();
};

export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
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

// ARIA live region announcements
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) => {
  const announcer =
    document.getElementById('aria-live-announcer') || createAnnouncer();
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;
};

const createAnnouncer = (): HTMLElement => {
  const announcer = document.createElement('div');
  announcer.id = 'aria-live-announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.position = 'absolute';
  announcer.style.left = '-10000px';
  announcer.style.width = '1px';
  announcer.style.height = '1px';
  announcer.style.overflow = 'hidden';
  document.body.appendChild(announcer);
  return announcer;
};

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Keyboard navigation helpers
export const handleArrowKeys = (
  event: KeyboardEvent,
  options: {
    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
    onHome?: () => void;
    onEnd?: () => void;
  }
) => {
  switch (event.key) {
    case 'ArrowUp':
      options.onUp?.();
      break;
    case 'ArrowDown':
      options.onDown?.();
      break;
    case 'ArrowLeft':
      options.onLeft?.();
      break;
    case 'ArrowRight':
      options.onRight?.();
      break;
    case 'Home':
      options.onHome?.();
      break;
    case 'End':
      options.onEnd?.();
      break;
  }
};

// Form validation helpers
export const getValidationMessage = (
  error: string,
  fieldName: string
): string => {
  return `${fieldName}: ${error}`;
};

export const announceValidationError = (error: string, fieldName: string) => {
  announceToScreenReader(getValidationMessage(error, fieldName), 'assertive');
};

// Skip links for keyboard navigation
export const createSkipLink = (
  targetId: string,
  text: string = 'Skip to main content'
): HTMLElement => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    transition: top 0.3s;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  return skipLink;
};


