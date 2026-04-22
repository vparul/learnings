## 1. createGlobalStyle vs ThemeProvider vs CSS Variables

### `createGlobalStyle` (styled-components)
- Injects raw CSS into `<head>`
- Best for: resets, `@font-face`, `body` styles
- No theming built in — just global CSS written inside JS

### `ThemeProvider` (styled-components)
- Passes a JS theme object via React context
- Every styled component can consume `props.theme.color`
- Strong TypeScript support
- Scoped to a component tree

### CSS Variables (native)
- Defined in `:root {}`, inherited by the entire DOM
- Works across any framework — or no framework
- Runtime-mutable (great for dark mode toggling)
- No JS dependency
- Can also be used *inside* styled-components

> **Rule of thumb:**
> - CSS variables → design tokens (colors, spacing, radii) — portable + theme-swappable at runtime
> - `ThemeProvider` → when you need type-safe access to theme values in component logic
> - `createGlobalStyle` → only for resets and global overrides, not for theming

## 2. Most Common Styling Library in the Real World

| Tier | Library | Notes |
|------|---------|-------|
| Dominant | **Tailwind CSS** | Most used since 2022–24. Used at Vercel, Linear, GitHub, Shopify |
| Runner-up | **styled-components** | Still huge in enterprise React codebases built pre-Tailwind era |
| Rising fast | **CSS Modules + Vanilla Extract** | Favored in Next.js / RSC (zero-runtime, server component friendly) |
| Legacy / large teams | **SCSS / SASS** | Common in Angular, plain HTML, and larger design system orgs |

## 3. Component Library vs Custom — How to Decide?

### Use a component library when…
- Moving fast (MVP, internal tool). WHEN SPEED IS THE PRIORITY 
- Small team, no dedicated designer
- B2B / admin dashboard — brand is not the product
- Accessibility is critical (MUI, Radix already handle it)
- Complex components needed: date pickers, comboboxes, data grids

### Build custom when…
- Strong brand identity (consumer product, marketing site)
- Library's look can't be overridden without fighting it
- Bundle size matters (libraries are heavy)
- You need full control (animation, layout, interactions)
- Design system already exists in Figma

### Practical middle path — Headless Libraries
Use **Radix UI**, **Headless UI**, or **shadcn/ui**:
- Zero styling opinions — you write the CSS
- They handle keyboard nav, ARIA, and focus management
- Best of both worlds: accessibility for free + full visual control

## 4. How Styled Components Causes Runtime Cost

At its core, styled-components does **style generation at runtime in the browser** — unlike SCSS or Tailwind which produce static CSS at build time.

### What happens at runtime:

Your component renders
       ↓
styled-components reads `props` + `theme` from context
       ↓
Runs your interpolation functions: `${props => props.primary ? 'blue' : 'gray'}`
       ↓
Generates a unique CSS class name (e.g. `sc-abc123`)
       ↓
Injects a <style> tag (or updates a stylesheet) in the <head>
       ↓
Attaches the class to your DOM element

This happens **on every render** if props change.

### Specific costs:

#### 1. CSS class generation on every render

// This function runs in the browser on every render
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  padding: ${props => props.size === 'lg' ? '12px 24px' : '8px 16px'};
`;

- styled-components hashes the output to create a unique class name
- If props change → new hash → new class → new style injection

#### 2. Style injection into the DOM
- Styles are injected via a `<style>` tag or `CSSStyleSheet.insertRule()`
- DOM manipulation is expensive — especially with many components or frequent re-renders
- Each unique prop combination = a new rule inserted into the stylesheet

#### 3. React context overhead
- `ThemeProvider` uses React context
- Every styled component subscribes to this context
- If the theme object reference changes → ALL styled components re-render

#### 4. JS bundle includes a CSS parser
- The styled-components library itself (~13KB gzipped) ships to the browser
- It includes a mini CSS parser to process your template literals at runtime

---

### Comparison: where work happens

| Approach | Style generation | Where |
|----------|-----------------|-------|
| SCSS | Build time | Server / CI |
| Tailwind | Build time (purge + compile) | Server / CI |
| CSS Modules | Build time | Server / CI |
| Vanilla Extract | Build time | Server / CI |
| styled-components | **Runtime** | **Browser** |
| Emotion (default) | **Runtime** | **Browser** |

---

### Why it matters at scale
- 50 components, each re-rendering 5x/sec → 250 style injections/sec
- On low-end mobile devices, JS execution is already the bottleneck
- Style recalculation (browser re-computing layout) is triggered on every injection

### How to mitigate it (if you must use styled-components):
- Use `.attrs()` to avoid new class generation for frequently-changing values
- Prefer static strings over prop interpolations when possible
- Use `babel-plugin-styled-components` for ahead-of-time class name generation
- Consider migrating to **Linaria** or **Vanilla Extract** — same DX, zero runtime