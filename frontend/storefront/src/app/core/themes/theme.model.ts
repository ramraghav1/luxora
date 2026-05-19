export interface Theme {
  name: string;
  displayName: string;
  description: string;
  properties: ThemeProperties;
}

export interface ThemeProperties {
  // Primary palette
  '--color-primary': string;
  '--color-primary-light': string;
  '--color-primary-dark': string;
  '--color-primary-50': string;
  '--color-primary-100': string;
  '--color-primary-200': string;
  '--color-primary-300': string;
  '--color-primary-400': string;
  '--color-primary-500': string;
  '--color-primary-600': string;
  '--color-primary-700': string;
  '--color-primary-800': string;
  '--color-primary-900': string;

  // Secondary/Accent
  '--color-accent': string;
  '--color-accent-light': string;
  '--color-accent-dark': string;

  // Neutrals
  '--color-bg': string;
  '--color-bg-secondary': string;
  '--color-bg-tertiary': string;
  '--color-surface': string;
  '--color-surface-hover': string;
  '--color-border': string;
  '--color-border-light': string;

  // Text
  '--color-text': string;
  '--color-text-secondary': string;
  '--color-text-muted': string;
  '--color-text-inverse': string;

  // Semantic
  '--color-success': string;
  '--color-warning': string;
  '--color-error': string;
  '--color-info': string;

  // Badges/Tags
  '--color-badge-new': string;
  '--color-badge-sale': string;
  '--color-badge-premium': string;
  '--color-badge-eco': string;

  // Shadows
  '--shadow-sm': string;
  '--shadow-md': string;
  '--shadow-lg': string;
  '--shadow-xl': string;

  // Radius
  '--radius-sm': string;
  '--radius-md': string;
  '--radius-lg': string;
  '--radius-xl': string;
  '--radius-full': string;

  // Typography
  '--font-primary': string;
  '--font-display': string;

  // Gradients
  '--gradient-primary': string;
  '--gradient-hero': string;
  '--gradient-card': string;

  // Transitions
  '--transition-fast': string;
  '--transition-normal': string;
  '--transition-slow': string;
}
