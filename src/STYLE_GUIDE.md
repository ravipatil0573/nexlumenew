# Nexlume Style Guide

This document explains how to use the centralized color system and font families defined in `App.css`.

## 📁 File Location
All global styles, colors, and fonts are defined in: **`src/App.css`**

This file is automatically imported in `App.jsx`, so all variables are available throughout your application.

---

## 🎨 Color System

### Using Colors in Tailwind CSS

The color system is integrated with Tailwind CSS. Use these classes:

#### Background Colors
```jsx
<div className="bg-bg-primary">      {/* Pure black */}
<div className="bg-bg-secondary">    {/* Dark gray */}
<div className="bg-bg-card">         {/* Card background */}
<div className="bg-bg-surface">      {/* Surface background */}
```

#### Text Colors
```jsx
<p className="text-text-primary">    {/* White */}
<p className="text-text-secondary">  {/* Light gray */}
<p className="text-text-tertiary">   {/* Medium gray */}
<p className="text-text-muted">     {/* Muted gray */}
```

#### Brand Colors (Red)
```jsx
<button className="bg-brand-primary">     {/* Red #ff0000 */}
<button className="bg-brand-500">         {/* Red #ff0000 */}
<button className="bg-brand-600">         {/* Darker red */}
```

#### Border Colors
```jsx
<div className="border border-borderCustom-primary">
<div className="border border-borderCustom-secondary">
<div className="border border-borderCustom-light">
```

### Using Colors in Regular CSS

You can also use CSS variables directly:

```css
.my-element {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}
```

---

## 🔤 Font Families

### Using Fonts in Tailwind CSS

```jsx
<div className="font-primary">   {/* Inter - for body text */}
<h1 className="font-heading">   {/* Poppins - for headings */}
<h2 className="font-display">   {/* Space Grotesk - for display text */}
```

### Using Fonts in Regular CSS

```css
.my-text {
  font-family: var(--font-primary);
}

.my-heading {
  font-family: var(--font-heading);
}
```

---

## 📝 Complete Example

```jsx
import React from 'react';

const MyComponent = () => {
  return (
    <section className="bg-bg-primary font-primary py-16">
      <div className="container mx-auto px-4">
        {/* Heading with heading font */}
        <h1 className="font-heading text-4xl font-bold text-text-primary mb-4">
          Welcome to Nexlume
        </h1>
        
        {/* Body text with primary font */}
        <p className="text-text-secondary mb-6">
          This is body text using the primary font family.
        </p>
        
        {/* Card with custom colors */}
        <div className="bg-bg-card border border-borderCustom-primary rounded-lg p-6">
          <h2 className="font-heading text-2xl text-text-primary mb-2">
            Card Title
          </h2>
          <p className="text-text-tertiary">
            Card content with muted text color.
          </p>
        </div>
        
        {/* Button with brand color */}
        <button className="mt-4 bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors">
          Click Me
        </button>
      </div>
    </section>
  );
};

export default MyComponent;
```

---

## 🎯 Available CSS Variables

### Colors
- `--color-primary` through `--color-primary-900` (Red shades)
- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-card`, etc.
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, etc.
- `--color-border-primary`, `--color-border-secondary`, etc.

### Fonts
- `--font-primary` (Inter)
- `--font-heading` (Poppins)
- `--font-display` (Space Grotesk)

### Spacing
- `--spacing-xs` through `--spacing-4xl`

### Shadows
- `--shadow-glow-red`
- `--shadow-glow-white`

---

## 💡 Tips

1. **Always use the CSS variables** instead of hardcoding colors
2. **Use Tailwind classes** when possible for consistency
3. **Font families** are automatically applied to body and headings via global styles
4. **All colors are theme-aware** and can be easily changed by updating `App.css`

---

## 🔄 Updating Colors

To change the color scheme, simply update the CSS variables in `src/App.css`:

```css
:root {
  --color-primary: #your-new-color;
  --color-bg-primary: #your-new-bg;
  /* etc. */
}
```

All components using these variables will automatically update!
