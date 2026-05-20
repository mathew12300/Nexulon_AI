# Nexulon AI - Design System

Premium, modern AI platform design language for career acceleration.

---

## 🎨 Color Palette

### Primary Colors
| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Purple** | `#7C3AED` | rgb(124, 58, 237) | Primary CTA, brand identity |
| **Cyan** | `#06B6D4` | rgb(6, 182, 212) | Highlights, secondary actions |
| **Gold** | `#F59E0B` | rgb(245, 158, 11) | Achievements, premium features |
| **Green** | `#10B981` | rgb(16, 185, 129) | Success, positive feedback |
| **Red** | `#EF4444` | rgb(239, 68, 68) | Errors, warnings |

### Neutral Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Dark BG** | `#0F172A` | Primary background |
| **Dark Card** | `#1E293B` | Card/panel backgrounds |
| **Dark Border** | `#334155` | Borders, dividers |
| **Light Text** | `#F1F5F9` | Primary text |
| **Muted Text** | `#94A3B8` | Secondary text |

### Gradients
```css
/* Hero Gradient */
background: linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%);

/* Card Hover Gradient */
background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);

/* Neon Glow */
background: linear-gradient(135deg, #7C3AED 0%, #06B6D4 50%, #F59E0B 100%);
```

---

## 🔤 Typography System

### Font Stack
```css
/* Headlines */
font-family: 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif;
font-weight: 700;

/* Body */
font-family: 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif;
font-weight: 400;

/* Code/Mono */
font-family: 'JetBrains Mono', 'Courier New', monospace;
font-weight: 400;
```

### Scale
| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| **H1** | 32px | 700 | 1.2 | -0.5px | Page titles |
| **H2** | 28px | 700 | 1.3 | -0.3px | Section titles |
| **H3** | 24px | 700 | 1.4 | 0px | Subsections |
| **H4** | 20px | 600 | 1.4 | 0px | Card titles |
| **Body L** | 18px | 400 | 1.6 | 0px | Large text |
| **Body M** | 16px | 400 | 1.6 | 0px | Standard body |
| **Body S** | 14px | 400 | 1.5 | 0px | Small text |
| **Label** | 12px | 500 | 1.4 | 0.5px | Labels, badges |

---

## 🔲 Spacing System

```
8px (xs)   - Tight spacing
12px (sm)  - Small gaps
16px (md)  - Standard padding
24px (lg)  - Large spacing
32px (xl)  - Extra large gaps
48px (2xl) - Massive spacing
```

### Component Spacing
- **Padding**: 16px / 24px (default)
- **Gaps**: 12px / 16px
- **Margins**: 24px / 32px
- **Border Radius**: 8px / 12px / 16px

---

## 📦 Component Library

### Buttons
```
Primary:   #7C3AED bg, white text, 12px px, 48px height
Secondary: transparent bg, #7C3AED border + text
Success:   #10B981 bg, white text
Danger:    #EF4444 bg, white text
Ghost:     transparent, #94A3B8 text
```

### Cards
```css
background: #1E293B;
border: 1px solid #334155;
border-radius: 12px;
padding: 24px;
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
transition: all 0.3s ease;

/* On Hover */
border-color: #7C3AED;
box-shadow: 0 20px 60px rgba(124, 58, 237, 0.2);
```

### Input Fields
```css
background: #0F172A;
border: 1px solid #334155;
border-radius: 8px;
padding: 12px 16px;
color: #F1F5F9;
font-size: 14px;

/* Focus State */
border-color: #7C3AED;
box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
```

### Badges
```css
display: inline-block;
padding: 4px 12px;
border-radius: 20px;
font-size: 12px;
font-weight: 600;

/* Premium Badge */
background: rgba(245, 158, 11, 0.1);
color: #F59E0B;
```

---

## ✨ Animation Guidelines

### Timing Functions
- **Ease In/Out**: `cubic-bezier(0.4, 0, 0.2, 1)` - 300ms
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - 400ms
- **Smooth**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - 250ms

### Effects
| Effect | Duration | Trigger |
|--------|----------|---------|
| Hover Scale | 200ms | Button/Card hover |
| Fade In | 300ms | Page load, modal |
| Slide Up | 400ms | Content reveal |
| Glow Pulse | 2s | CTA, premium feature |
| Bounce | 600ms | Success action |

### Example Animations
```css
/* Hover Effect */
@keyframes hoverGlow {
  0% { box-shadow: 0 0 20px rgba(124, 58, 237, 0); }
  50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.5); }
  100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0); }
}

/* Card Entrance */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulsing Icon */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🎯 Layout System

### Grid
```
Desktop: 12-column grid, 24px gutter
Tablet:  8-column grid, 20px gutter
Mobile:  4-column grid, 16px gutter
```

### Breakpoints
```
xs: 320px   - Mobile
sm: 640px   - Small tablet
md: 1024px  - Tablet
lg: 1280px  - Desktop
xl: 1536px  - Large desktop
```

### Safe Areas
- Top Padding: 64px (header)
- Side Padding: 24px (desktop), 16px (mobile)
- Bottom Padding: 32px

---

## 🌙 Dark Mode (Default)

All components are designed for dark theme:
- **Text**: #F1F5F9 (light gray)
- **Backgrounds**: #0F172A (very dark)
- **Accents**: Bright purples, cyans, golds
- **Contrast Ratio**: 7:1+ (WCAG AAA)

---

## ♿ Accessibility

- **Color Contrast**: Minimum 4.5:1 for text
- **Focus States**: Visible 3px outline
- **Touch Targets**: Minimum 44px × 44px
- **Alt Text**: All images described
- **ARIA Labels**: Form inputs labeled
- **Keyboard Navigation**: Full support

---

## 📱 Responsive Design

### Mobile First Approach
1. Start with mobile layout (320px)
2. Enhance on tablet (640px+)
3. Optimize for desktop (1024px+)

### Common Adjustments
- Single column on mobile, multi-column on desktop
- Stack components vertically on mobile
- Larger touch targets on mobile
- Hamburger menu navigation on mobile

---

## 🎬 Component States

### Interactive States
- **Default**: Base appearance
- **Hover**: Subtle highlight
- **Active**: Solid engagement
- **Focus**: Keyboard accessible
- **Disabled**: Reduced opacity (60%), no interaction
- **Loading**: Skeleton/spinner animation
- **Error**: Red border/highlight + message

---

## 🎨 Figma / Design Reference

**Brand Kit:**
- Primary Color: #7C3AED
- Secondary Color: #06B6D4
- Accent Color: #F59E0B
- Background: #0F172A

**Available on:**
- Figma File: [Link to Figma workspace]
- Style Guide: [Link to brand guide]
- Component Library: [Link to storybook]

---

## 📚 Usage Examples

### CTA Button
```html
<button class="bg-purple-600 text-white px-6 py-3 rounded-lg 
  hover:bg-purple-700 transition-all duration-300 
  shadow-lg hover:shadow-xl hover:shadow-purple-500/50">
  Get Started Free
</button>
```

### Card Component
```html
<div class="bg-slate-800 border border-slate-700 rounded-lg 
  p-6 hover:border-purple-500 hover:shadow-lg 
  hover:shadow-purple-500/20 transition-all duration-300">
  <h3 class="text-white text-lg font-bold mb-2">Feature Title</h3>
  <p class="text-slate-400">Description text here</p>
</div>
```

### Gradient Hero
```html
<div class="bg-gradient-to-r from-purple-600 to-cyan-500 
  rounded-xl p-1">
  <div class="bg-slate-900 rounded-lg p-8">
    <h1 class="text-4xl font-bold text-white">Welcome to Nexulon</h1>
  </div>
</div>
```

---

**Last Updated**: 2024
**Version**: 1.0
**Maintained By**: Design Team
