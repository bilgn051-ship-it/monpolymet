import { createTheme } from '@mantine/core';

/**
 * Monpolymet Corporate Theme. `brand` is the Royal Monpolymet Blue scale
 * (#001CE8) used for primary buttons, active navigation, links, and accents.
 */
export const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 5 },
  colors: {
    brand: [
      '#eef2ff', // 0
      '#e0e7ff', // 1
      '#c7d2fe', // 2
      '#a5b4fc', // 3
      '#6366f1', // 4
      '#4338ca', // 5
      '#001CE8', // 6 - Primary Monpolymet Royal Blue
      '#0018c4', // 7
      '#0014a0', // 8
      '#000f7c', // 9
    ],
  },
  fontFamily:
    '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily:
      '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
});
