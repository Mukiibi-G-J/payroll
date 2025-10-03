# CSS Migration Guide for Accupay Next.js Project

## Overview

This guide outlines how to preserve and migrate the existing CSS from the static HTML website to the Next.js application while maintaining visual consistency and functionality.

## Current CSS Structure Analysis

### Existing CSS Files

- **`style.css`** (4,750 lines) - Main compiled Tailwind CSS with custom styles
- **`assets/css/animate.min.css`** - Animation library (3,698 lines)
- **`assets/css/odometer.css`** - Counter animations (104 lines)
- **`assets/css/swiper.min.css`** - Carousel/slider styles (13 lines)

### Key Features to Preserve

1. **Custom Color Palette**:

   - Primary: `#1a938a` (teal)
   - Secondary: `#ffbf3f` (yellow)
   - Accent: `#005151` (dark teal)
   - Text colors: `#060b1e`, `#3b4a46`
   - Background colors: `#f7f7f7`, `#eafaf8`

2. **Custom Spacing System**:

   - `stp-30` (120px top padding)
   - `sbp-30` (120px bottom padding)
   - `stp-15` (60px top padding)
   - `sbp-15` (60px bottom padding)

3. **Custom Animations**:

   - `fadeDown` - Menu animations
   - `circleAnimation` - Rotating elements
   - `zoomInOutAnimation` - Scale effects
   - `jumpingImage1/2` - Bounce effects
   - `slideRight/Left` - Slide animations
   - `lineAnimation` - Progress bars

4. **Typography**:
   - Font: Outfit (Google Fonts)
   - Custom heading classes: `display-2`, `display-3`, `display-4`
   - Custom text classes: `heading-1` through `heading-5`

## Migration Strategy

### Step 1: Copy Existing CSS Files

```bash
# Create styles directory in Next.js project
mkdir -p src/styles

# Copy CSS files
cp accupay/main/style.css src/styles/legacy.css
cp accupay/main/assets/css/animate.min.css src/styles/
cp accupay/main/assets/css/odometer.css src/styles/
cp accupay/main/assets/css/swiper.min.css src/styles/
```

### Step 2: Update Next.js Global Styles

```css
/* app/globals.css */
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap");
@import "../styles/animate.min.css";
@import "../styles/odometer.css";
@import "../styles/swiper.min.css";

/* Import legacy styles to preserve existing design */
@import "../styles/legacy.css";

/* Additional Next.js specific styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: "Outfit", sans-serif;
}
```

### Step 3: Configure Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extract from existing style.css
        primary: {
          50: "#f0fdfa",
          500: "#1a938a",
          600: "#0f766e",
          700: "#0d5f5a",
        },
        secondary: {
          50: "#fffbeb",
          500: "#ffbf3f",
          600: "#f59e0b",
        },
        accent: {
          50: "#f0f9ff",
          500: "#005151",
          600: "#004040",
        },
        // Preserve existing color naming
        mainTextColor: "#060b1e",
        bodyText: "#3b4a46",
        strokeColor: "#e4e4e4",
        softBg: "#f7f7f7",
        softBg1: "#eafaf8",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      spacing: {
        15: "60px",
        30: "120px",
      },
      animation: {
        fadeDown: "fadeDown 0.5s linear",
        fadeDown2: "fadeDown2 0.5s linear",
        line: "line 3s",
        circle: "circleAnimation 15s linear infinite",
        zoomInOut: "zoomInOutAnimation 10s linear infinite",
        jumping1: "jumpingImage1 3s linear infinite",
        jumping2: "jumpingImage2 3s linear infinite",
        slideRight: "slideRight 3s linear infinite",
        slideLeft: "slideLeft 3s linear infinite",
      },
      keyframes: {
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown2: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        line: {
          "0%": { width: "0%" },
          "100%": { width: "auto" },
        },
        circleAnimation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        zoomInOutAnimation: {
          "50%": { transform: "scale(0.9)" },
        },
        jumpingImage1: {
          "50%": { transform: "translateY(10px)" },
        },
        jumpingImage2: {
          "50%": { transform: "translateY(-10px)" },
        },
        slideRight: {
          "50%": { transform: "translateX(10px)" },
        },
        slideLeft: {
          "50%": { transform: "translateX(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
```

### Step 4: Component Migration Strategy

#### Preserve Existing Class Names

When migrating HTML to React components, maintain the existing class names:

```tsx
// Before (HTML)
<div class="hero_bg_gradient stp-30 sbp-30">
  <h1 class="display-2 text-white">Welcome to Accupay</h1>
</div>

// After (React/Next.js)
<div className="hero_bg_gradient stp-30 sbp-30">
  <h1 className="display-2 text-white">Welcome to Accupay</h1>
</div>
```

#### Create CSS Modules for Overrides

For component-specific styling that needs to override existing styles:

```css
/* components/Hero.module.css */
.heroContainer {
  @apply hero_bg_gradient stp-30 sbp-30;
}

.heroTitle {
  @apply display-2 text-white;
}
```

```tsx
// components/Hero.tsx
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.heroTitle}>Welcome to Accupay</h1>
    </div>
  );
}
```

### Step 5: Animation Preservation

#### Custom Animation Classes

Preserve existing animation classes:

```tsx
// Mobile menu animation
<div className="mobileMenuOpen">
  {/* Menu content */}
</div>

// Counter animation
<div className="odometer" data-count="100">
  {/* Counter content */}
</div>

// Progress bar animation
<div className="lineAnimation">
  {/* Progress bar */}
</div>
```

#### Framer Motion Integration

For enhanced animations, integrate Framer Motion while preserving existing ones:

```tsx
import { motion } from "framer-motion";

export function AnimatedCard() {
  return (
    <motion.div
      className="existing-classes"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Step 6: Responsive Design Preservation

#### Maintain Existing Breakpoints

The existing CSS uses custom responsive classes. Preserve these:

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Grid items */}
</div>

// Responsive spacing
<div className="stp-30 max-lg:stp-15">
  {/* Content with responsive padding */}
</div>
```

### Step 7: Image Optimization

#### Preserve Existing Image Classes

```tsx
// Before (HTML)
<img src="hero.jpg" alt="Hero" class="w-full h-auto object-cover" />;

// After (Next.js with optimization)
import Image from "next/image";

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  className="w-full h-auto object-cover"
  priority
/>;
```

### Step 8: Form Styling

#### Preserve Existing Form Classes

```tsx
// Contact form with existing styling
<form className="contact-form">
  <input
    type="text"
    className="form-input placeholder:text-bodyText"
    placeholder="Your Name"
  />
  <button type="submit" className="btn-primary hover:bg-primary/90">
    Submit
  </button>
</form>
```

## Testing Strategy

### Visual Regression Testing

1. **Screenshot Comparison**: Compare before/after screenshots
2. **Component Testing**: Test individual components
3. **Responsive Testing**: Test all breakpoints
4. **Animation Testing**: Verify all animations work

### Performance Testing

1. **CSS Bundle Size**: Monitor CSS bundle size
2. **Animation Performance**: Test animation smoothness
3. **Loading Performance**: Ensure fast CSS loading

## Common Issues and Solutions

### Issue 1: CSS Not Loading

**Solution**: Ensure proper import order in globals.css

### Issue 2: Animations Not Working

**Solution**: Check if animation libraries are properly imported

### Issue 3: Responsive Issues

**Solution**: Verify Tailwind configuration includes all breakpoints

### Issue 4: Font Loading

**Solution**: Use Next.js font optimization while preserving Outfit font

## Migration Checklist

- [ ] Copy all CSS files to Next.js project
- [ ] Update globals.css with imports
- [ ] Configure Tailwind with existing colors
- [ ] Preserve all custom animations
- [ ] Test responsive design
- [ ] Verify font loading
- [ ] Test all interactive elements
- [ ] Optimize CSS bundle size
- [ ] Run visual regression tests

## Post-Migration Optimization

### CSS Optimization

1. **Remove Unused CSS**: Use PurgeCSS to remove unused styles
2. **Minify CSS**: Minify CSS files for production
3. **Critical CSS**: Extract critical CSS for above-the-fold content

### Performance Monitoring

1. **Core Web Vitals**: Monitor LCP, FID, CLS
2. **CSS Performance**: Monitor CSS loading times
3. **Animation Performance**: Ensure smooth animations

## Conclusion

This migration strategy ensures that the existing design and functionality are preserved while gaining the benefits of Next.js optimization. The key is to maintain the existing CSS structure while gradually modernizing the codebase.

The migration should be done incrementally, testing each component to ensure visual consistency and functionality are maintained throughout the process.
