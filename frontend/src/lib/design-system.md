# AccuPay Design System Analysis

## Color Palette

Based on the existing landing page components, here are the key colors:

### Primary Colors

- **s1**: `#005151` - Dark teal (primary brand color)
- **s2**: `#ffbf3f` - Accent yellow (CTA buttons, highlights)
- **s3**: `#e8a115` - Secondary yellow (hover states)
- **p1**: `#1a938a` - Primary accent (links, active states)

### Text Colors

- **mainTextColor**: `#060b1e` - Dark text (headings, primary text)
- **bodyText**: `#3b4a46` - Body text (secondary text)

### Background Colors

- **softBg**: `#f7f7f7` - Soft background
- **softBg2**: `#eafaf8` - Soft teal background
- **white**: `#ffffff` - Pure white
- **black**: `#000000` - Pure black

### Border Colors

- **strokeColor**: `#e5e5e5` - Primary border
- **strokeColor2**: `#e4e4e4` - Light stroke

## Typography

- **Font Family**: Outfit (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Default**: Outfit, sans-serif

### Font Sizes

- **display-2**: 3.75rem (60px) - Hero headings
- **display-3**: 1.5rem (24px) - Section headings
- **display-4**: 1.25rem (20px) - Subsection headings
- **text-xl**: 1.25rem (20px) - Large text
- **text-lg**: 1.125rem (18px) - Medium text
- **text-base**: 1rem (16px) - Base text
- **text-sm**: 0.875rem (14px) - Small text

## Component Patterns

### Buttons

- **Primary**: `bg-s2 text-mainTextColor` with rounded corners
- **Hover**: `hover:bg-s2/90` with transition
- **Rounded**: `rounded-full` for CTA buttons
- **Padding**: `px-6 py-3` or `px-8 py-4` for larger buttons

### Form Elements

- **Input**: `border border-strokeColor rounded-lg focus:border-s2`
- **Padding**: `px-4 py-3`
- **Focus**: `focus:outline-none` with border color change
- **Labels**: `text-sm font-medium text-s1`

### Cards

- **Background**: `bg-white` or `bg-softBg`
- **Border**: `border border-strokeColor`
- **Rounded**: `rounded-lg`
- **Padding**: `p-4` or `p-6`

### Navigation

- **Menu Items**: `hover:header_menu_shadow duration-700`
- **Active States**: Color changes to `s2` or `p1`
- **Transitions**: `duration-500` or `duration-700`

## Spacing System

- **Section Padding**: `stp-15` (60px top), `sbp-15` (60px bottom)
- **Grid Gaps**: `gap-3`, `gap-6`, `gap-8`
- **Component Spacing**: `space-y-4`, `space-y-6`, `space-y-8`

## Responsive Breakpoints

- **md**: 768px
- **lg**: 992px
- **xl**: 1200px

## Animation Patterns

- **Transitions**: `duration-300`, `duration-500`, `duration-700`
- **Hover Effects**: Scale, rotate, color changes
- **Loading States**: Spinner animations
- **Menu Animations**: Slide, fade, scale effects

## Accessibility Features

- **Focus States**: Clear focus indicators
- **Color Contrast**: High contrast text
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels
- **Error States**: Clear error messaging with icons

## Component States

- **Default**: Base styling
- **Hover**: Subtle color/scale changes
- **Active**: Color changes to accent colors
- **Disabled**: Reduced opacity
- **Loading**: Spinner with disabled state
- **Error**: Red text with alert icons
- **Success**: Green text with check icons


