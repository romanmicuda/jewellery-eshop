/**
 * Jewelry Store Color System
 * 
 * This file defines the color palette for the jewelry e-commerce application.
 * All colors are designed to work harmoniously with the warm, elegant aesthetic.
 */

export const colors = {
  // Primary Colors - Elegant gold/bronze theme
  primary: {
    50: 'oklch(0.95 0.02 48)',   // Very light gold
    100: 'oklch(0.88 0.03 48)',  // Light gold
    200: 'oklch(0.78 0.05 48)',  // Soft gold
    300: 'oklch(0.68 0.06 48)',  // Medium gold
    400: 'oklch(0.58 0.07 48)',  // Gold
    500: 'oklch(0.48 0.08 48)',  // Primary gold
    600: 'oklch(0.38 0.08 48)',  // Dark gold
    700: 'oklch(0.28 0.06 48)',  // Darker gold
    800: 'oklch(0.22 0.04 48)',  // Very dark gold
    900: 'oklch(0.16 0.03 48)',  // Deepest gold
  },

  // Secondary Colors - Warm taupe/beige
  secondary: {
    50: 'oklch(0.96 0.01 45)',   // Very light taupe
    100: 'oklch(0.92 0.015 45)', // Light taupe
    200: 'oklch(0.88 0.02 45)',  // Soft taupe
    300: 'oklch(0.82 0.025 45)', // Medium taupe
    400: 'oklch(0.75 0.03 45)',  // Taupe
    500: 'oklch(0.68 0.035 45)', // Primary taupe
    600: 'oklch(0.58 0.03 45)',  // Dark taupe
    700: 'oklch(0.48 0.025 45)', // Darker taupe
    800: 'oklch(0.38 0.02 45)',  // Very dark taupe
    900: 'oklch(0.28 0.015 45)', // Deepest taupe
  },

  // Accent Colors - Rose gold
  accent: {
    50: 'oklch(0.95 0.02 25)',   // Very light rose gold
    100: 'oklch(0.90 0.025 25)', // Light rose gold
    200: 'oklch(0.85 0.03 25)',  // Soft rose gold
    300: 'oklch(0.80 0.035 25)', // Medium rose gold
    400: 'oklch(0.75 0.04 25)',  // Rose gold
    500: 'oklch(0.70 0.045 25)', // Primary rose gold
    600: 'oklch(0.62 0.04 25)',  // Dark rose gold
    700: 'oklch(0.54 0.035 25)', // Darker rose gold
    800: 'oklch(0.46 0.03 25)',  // Very dark rose gold
    900: 'oklch(0.38 0.025 25)', // Deepest rose gold
  },

  // Neutral Colors - Warm grays and browns
  neutral: {
    50: 'oklch(0.98 0.01 55)',   // Cream white
    100: 'oklch(0.94 0.015 55)', // Very light cream
    200: 'oklch(0.88 0.02 55)',  // Light cream
    300: 'oklch(0.82 0.025 55)', // Soft cream
    400: 'oklch(0.72 0.02 45)',  // Light brown
    500: 'oklch(0.62 0.02 40)',  // Medium brown
    600: 'oklch(0.52 0.025 35)', // Brown
    700: 'oklch(0.42 0.025 30)', // Dark brown
    800: 'oklch(0.32 0.025 25)', // Very dark brown
    900: 'oklch(0.24 0.03 30)',  // Deepest brown
  },

  // Semantic Colors
  success: {
    50: 'oklch(0.95 0.05 140)',  // Very light green
    500: 'oklch(0.65 0.12 140)', // Success green
    600: 'oklch(0.55 0.12 140)', // Dark success green
  },

  warning: {
    50: 'oklch(0.95 0.05 80)',   // Very light yellow
    500: 'oklch(0.75 0.12 80)',  // Warning yellow
    600: 'oklch(0.65 0.12 80)',  // Dark warning yellow
  },

  error: {
    50: 'oklch(0.95 0.05 15)',   // Very light red
    500: 'oklch(0.65 0.18 15)',  // Error red
    600: 'oklch(0.55 0.18 15)',  // Dark error red
  },

  // Jewelry-specific colors for product categories
  jewelry: {
    gold: 'oklch(0.78 0.12 58)',      // Pure gold
    silver: 'oklch(0.85 0.02 200)',   // Silver
    platinum: 'oklch(0.88 0.01 240)', // Platinum
    diamond: 'oklch(0.95 0.02 240)',  // Diamond sparkle
    ruby: 'oklch(0.55 0.22 15)',      // Ruby red
    emerald: 'oklch(0.55 0.18 140)',  // Emerald green
    sapphire: 'oklch(0.45 0.18 240)', // Sapphire blue
    amethyst: 'oklch(0.65 0.15 320)', // Amethyst purple
    pearl: 'oklch(0.92 0.01 60)',     // Pearl white
  }
} as const;

/**
 * Color utility functions
 */
export const colorUtils = {
  /**
   * Get a color with opacity
   */
  withOpacity: (color: string, opacity: number) => {
    return color.replace(')', ` / ${opacity})`);
  },

  /**
   * Common color combinations for the jewelry store
   */
  combinations: {
    // Primary button
    primaryButton: {
      background: colors.primary[500],
      foreground: colors.neutral[50],
      hover: colors.primary[600],
    },
    
    // Secondary button
    secondaryButton: {
      background: colors.secondary[200],
      foreground: colors.neutral[800],
      hover: colors.secondary[300],
    },
    
    // Accent button (CTA)
    accentButton: {
      background: colors.accent[500],
      foreground: colors.neutral[50],
      hover: colors.accent[600],
    },
    
    // Card styling
    card: {
      background: colors.neutral[50],
      border: colors.secondary[200],
      shadow: 'oklch(0.24 0.03 30 / 0.1)', // Direct color with opacity
    },
    
    // Input styling
    input: {
      background: colors.neutral[100],
      border: colors.secondary[300],
      focus: colors.primary[500],
    },
  }
} as const;

export type ColorScale = typeof colors.primary;
export type JewelryColor = keyof typeof colors.jewelry;
