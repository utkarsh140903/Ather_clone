// Eco-friendly color palette
export const colors = {
  // Primary colors
  primary: {
    50: '#e6f7ed',
    100: '#c2ebd3',
    200: '#9ddeb8',
    300: '#79d19d',
    400: '#56c483',
    500: '#32b869', // Main brand color
    600: '#2da65f',
    700: '#279155',
    800: '#217d4b',
    900: '#1a6940',
  },
  
  // Accent colors (blue shades)
  accent: {
    50: '#e6f3fa',
    100: '#c2e1f2',
    200: '#9dceea',
    300: '#79bbe2',
    400: '#56a8da',
    500: '#3295d2', // Secondary brand color
    600: '#2d86bd',
    700: '#2775a7',
    800: '#216391',
    900: '#1a527b',
  },
  
  // Neutral gray shades
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: '#34d399', // Green
  warning: '#fbbf24', // Amber
  error: '#ef4444',   // Red
  info: '#3b82f6',    // Blue
  
  // Chart colors for different vehicle types
  chart: {
    gasoline: '#ef4444', // Red - highest emissions
    diesel: '#f97316',   // Orange - high emissions
    hybrid: '#facc15',   // Yellow - medium emissions
    electric: '#34d399', // Green - low emissions
    walking: '#3b82f6',  // Blue - walking
    cycling: '#8b5cf6',  // Purple - cycling
    bus: '#ec4899',      // Pink - public transport
  }
};

// Font sizes (using Tailwind default scale)
export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
};

// Spacing scale (using Tailwind default scale)
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
};

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

// Box shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

