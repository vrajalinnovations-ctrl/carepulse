# CarePulse — Healthcare & Hospital Management Dashboard

<p align="center">
  <img src="src/assets/logo/logo-sm.png" alt="CarePulse Logo" width="64" height="64" />
</p>

A modern, clinical-grade React single-page hospital and clinical operations dashboard built with Vite and Tailwind CSS.

## Tech Stack

- **React** v19.2.8 — UI library
- **Vite** v8.2.0 — Build tool and dev server
- **Tailwind CSS** v4.3.3 — Utility-first CSS framework
- **ESLint** v10.8.0 — Code linting
- **React Compiler** — Enabled via `babel-plugin-react-compiler`

## Project Structure

```
cyber/
├── public/              # Static assets (favicon, icons)
├── src/
│   ├── assets/          # Images (hero.png, react.svg, vite.svg)
│   ├── components/
│   │   └── Navbar.jsx        # Responsive navbar with mobile menu
│   ├── context/
│   │   ├── ColorContext.jsx   # Primary color palette provider
│   │   ├── ThemeContext.jsx   # Theme (dark/light) + direction (RTL/LTR) provider
│   │   ├── useColors.jsx      # Custom hook for color palette access
│   │   └── useTheme.jsx       # Custom hook for theme/direction access
│   ├── routes/
│   │   └── AppRoutes.jsx      # Centralized route mapping & layout isolation
│   ├── App.jsx          # Main application component mounting AppRoutes
│   ├── App.css          # Component-level styles
│   ├── index.css        # Global styles + Tailwind config + theme tokens
│   └── main.jsx         # React entry point
├── index.html           # Vite HTML entry
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint flat config
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens the live app at [https://carepulse-gamma-murex.vercel.app/](https://carepulse-gamma-murex.vercel.app/) (or locally at `http://localhost:5173`) with hot module replacement (HMR).

### Production Build

```bash
npm run build
```

Output is written to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Lint

```bash
npm run lint
```

Runs ESLint across all `.js` and `.jsx` files.

## Features

- Responsive navbar with mobile hamburger menu (Tailwind CSS)
- Dark/light theme support (via `ThemeContext`)
- RTL/LTR direction switching (via `ThemeContext`)
- Primary color palette with 11 shades (50–950) defined in `index.css` via Tailwind `@theme`
- Responsive layout with mobile breakpoints
- React Compiler enabled for optimized rendering

## Using Primary Colors

### Tailwind Classes (in JSX/HTML)

Use `primary-*` utility classes directly:

```jsx
<div className="bg-primary-500">    // background
<div className="text-primary-700">  // text color
<div className="border-primary-300"> // border
```

All 11 shades are available: `primary-50` through `primary-950`.

### JavaScript (via Context Hooks)

Access colors programmatically via the custom hooks:

```jsx
import { useColors } from './context/useColors.jsx'

function MyComponent() {
  const { colors, activeShade, setActiveShade, activeColor } = useColors()

  // colors['500']           → "#10B981"
  // activeColor             → current shade value
  // setActiveShade('700')   → switch active shade
}
```

```jsx
import { useTheme } from './context/useTheme.jsx'

function MyComponent() {
  const { colors, activeColor } = useTheme()
  // Same color access via theme context
}
```

### Color Reference

| Shade | Hex       | Best for                    |
|-------|-----------|-----------------------------|
| 50    | #ECFDF3   | Light backgrounds           |
| 100   | #D1FAE5   | Hover backgrounds           |
| 200   | #A7F3D0   | Borders                     |
| 300   | #6EE7B7   | Borders, icons              |
| 400   | #34D399   | Icons, badges               |
| 500   | #10B981   | Primary buttons             |
| 600   | #059669   | Button hover                |
| 700   | #047857   | Dark text                   |
| 800   | #065F46   | Darker text                 |
| 900   | #064E3B   | Headings                    |
| 950   | #022C22   | Darkest accent              |
