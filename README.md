# Dubai Mall Sales Deck

A premium, cinematic, interactive sales deck web application for Dubai Mall using React, Vite, Tailwind CSS, Framer Motion, GSAP, and Lenis.

## Features

- **Video-First Experience**: Hero section with autoplay background video
- **Smooth Animations**: Framer Motion for UI animations, GSAP for parallax effects
- **Performance Optimized**: Lazy loading, optimized assets, Lighthouse 90+ ready
- **Responsive Design**: Desktop and mobile optimized
- **Accessibility**: Reduced motion support

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lenis (smooth scrolling)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── sections/       # Page sections
├── hooks/          # Custom React hooks
├── lib/            # Utility libraries
└── assets/         # Static assets
```

## Assets

Placeholder assets are referenced in the code. Replace with actual Dubai Mall assets:

- `/public/assets/hero-video.mp4` - Hero background video
- `/public/assets/aquarium.mp4` - Aquarium video
- `/public/assets/dining.jpg` - Dining image
- `/public/assets/attractions.jpg` - Attractions image
- `/public/assets/brands/*.png` - Brand logos

## Performance Notes

- Videos are lazy loaded and paused when out of viewport
- GSAP animations use `will-change` sparingly
- Lenis provides smooth scrolling without jank
- Images should be optimized to WebP/AVIF formats

## AI Integration

The Experience section includes an "AI Vision" placeholder for future AI-generated content or insights.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
