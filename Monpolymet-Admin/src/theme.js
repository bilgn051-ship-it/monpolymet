import { createTheme } from '@mantine/core';

/**
 * Monpolymet admin theme. `brand` is the corporate blue scale (light → dark)
 * used for primary buttons, active nav, links and accents.
 */
export const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 5 },
  colors: {
    brand: [
      '#e8f1ff',
      '#d0e0ff',
      '#a1beff',
      '#6f9bfd',
      '#487dfb',
      '#2f6bfa',
      '#1f62fb',
      '#1152e0',
      '#0448c9',
      '#003db2',
    ],
  },
  fontFamily:
    '"Montserrat", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily:
      '"Montserrat", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'xl',
});
