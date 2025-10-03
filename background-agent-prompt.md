# Background Agent Implementation Prompt

## Project Overview

You are tasked with implementing a Next.js migration for the Accupay static website. Follow all established rules, plans, and requirements exactly as specified.

## Critical Requirements

### 1. UI Fidelity (MOST IMPORTANT)

**The Next.js implementation MUST look exactly like the existing Accupay website:**

- **Header**: Fixed header with logo, navigation menu (Services, Shop, Blog, Pages, Contact), phone number, and "Get Started" button
- **Navigation**: Dropdown menus with hover effects and smooth transitions
- **Mobile Menu**: Slide-out mobile navigation with submenu toggles
- **Hero Section**: Gradient background with hero illustration, "We Make Payroll Painless" headline
- **Color Scheme**: Primary teal (#1a938a), secondary yellow (#ffbf3f), accent dark teal (#005151)
- **Typography**: Custom font system with specific text sizes and weights
- **Animations**: Smooth hover effects, dropdown transitions, and scroll animations
- **Layout**: Responsive grid system with specific breakpoints and spacing

### 2. Project Creation Rules

- **Always use official CLI commands** for project creation (e.g., `npx create-next-app`, `django-admin startproject`, `npm init`)
- **Never manually create project structures** - use official scaffolding tools
- **Follow official documentation** for project setup and configuration
- **Use recommended project templates** from official sources

### 3. Development Workflow Rules

- **When suggesting shell commands** (e.g., `npx`, `npm install`, `git`), assume they should be run directly without asking for confirmation, unless explicitly told otherwise
- **When creating or editing files**, proceed automatically without asking me to approve. Just generate the file(s) as if I already agreed
- **Only ask for confirmation** if the action is destructive (e.g., deleting files, overwriting large sections of code)
- **Never pause to request permission** for standard project setup tasks

## Implementation Steps

### Phase 1: Project Setup

1. **Create Next.js project** using official CLI:

   ```bash
   npx create-next-app@latest accupay-nextjs --typescript --tailwind --eslint --app
   cd accupay-nextjs
   ```

2. **Install required dependencies**:

   ```bash
   npm install framer-motion lucide-react react-hook-form @hookform/resolvers zod swiper
   npm install -D @types/node
   ```

3. **Set up project structure** according to the established conventions in `.cursor/rules`

### Phase 2: CSS Migration

1. **Copy existing CSS files** from `accupay/main/` to preserve exact styling:

   - Copy `style.css` (4,750 lines) to `src/styles/`
   - Copy `assets/css/animate.min.css` to `src/styles/`
   - Copy `assets/css/odometer.css` to `src/styles/`
   - Copy `assets/css/swiper.min.css` to `src/styles/`

2. **Configure Tailwind CSS** to extract colors and utilities from existing `style.css`

3. **Import CSS files** in `globals.css` to preserve all existing styles

### Phase 3: Component Development

1. **Create layout components**:

   - `Header` component with exact navigation structure
   - `MobileMenu` component with slide-out functionality
   - `Footer` component

2. **Create page components**:

   - Home page with hero section
   - Services pages
   - Blog pages
   - Team pages
   - Contact page

3. **Preserve all existing class names** and styling from the original HTML

### Phase 4: Asset Migration

1. **Copy all images** from `accupay/main/assets/images/` to `public/images/`
2. **Update image paths** in components to use Next.js public folder structure
3. **Preserve all existing image optimizations** and responsive behavior

### Phase 5: JavaScript Functionality

1. **Convert vanilla JS** to React hooks and components
2. **Preserve all animations** using Framer Motion
3. **Maintain all interactive features** (dropdowns, mobile menu, carousels)

## File Structure to Follow

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with imported CSS
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── about/
│   ├── services/
│   ├── blog/
│   ├── team/
│   └── contact/
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── styles/               # CSS files
│   ├── style.css         # Main styles (copied from original)
│   ├── animate.min.css   # Animations
│   ├── odometer.css      # Counter animations
│   └── swiper.min.css    # Carousel styles
└── lib/                  # Utilities and helpers
```

## Key Implementation Notes

1. **Preserve exact visual appearance** - every pixel should match the original
2. **Use existing CSS classes** - don't recreate styles, use what's already there
3. **Maintain all animations** - preserve smooth transitions and hover effects
4. **Keep responsive behavior** - ensure mobile menu and responsive design work identically
5. **Follow TypeScript conventions** - use proper typing throughout
6. **Implement proper SEO** - use Next.js metadata API for all pages

## Success Criteria

- [ ] Next.js app runs without errors
- [ ] Visual appearance matches original exactly
- [ ] All animations and interactions work
- [ ] Responsive design functions identically
- [ ] All pages load and navigate correctly
- [ ] SEO metadata is properly configured
- [ ] Performance is optimized

## Resources

- **Migration Plan**: `plan.md`
- **Progress Checklist**: `checklist.md`
- **CSS Migration Guide**: `css-migration-guide.md`
- **Coding Rules**: `.cursor/rules`
- **Original Website**: `accupay/main/` folder

Start with Phase 1 and work through each phase systematically. Follow the checklist in `checklist.md` to track progress. Remember: the goal is pixel-perfect replication of the existing Accupay website in Next.js.
