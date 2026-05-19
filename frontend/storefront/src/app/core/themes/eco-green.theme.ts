import { Theme } from './theme.model';

export const ecoGreenTheme: Theme = {
  name: 'eco-green',
  displayName: 'Eco Green',
  description: 'A nature-inspired green theme promoting sustainability and eco-friendliness',
  properties: {
    // Primary palette - Deep green tones
    '--color-primary': '#2d6a4f',
    '--color-primary-light': '#52b788',
    '--color-primary-dark': '#1b4332',
    '--color-primary-50': '#f0fdf4',
    '--color-primary-100': '#dcfce7',
    '--color-primary-200': '#bbf7d0',
    '--color-primary-300': '#86efac',
    '--color-primary-400': '#4ade80',
    '--color-primary-500': '#22c55e',
    '--color-primary-600': '#16a34a',
    '--color-primary-700': '#15803d',
    '--color-primary-800': '#166534',
    '--color-primary-900': '#14532d',

    // Accent - Warm earthy gold
    '--color-accent': '#d4a373',
    '--color-accent-light': '#e9c46a',
    '--color-accent-dark': '#a47148',

    // Backgrounds
    '--color-bg': '#fafdf7',
    '--color-bg-secondary': '#f1f8e9',
    '--color-bg-tertiary': '#e8f5e9',
    '--color-surface': '#ffffff',
    '--color-surface-hover': '#f0fdf4',
    '--color-border': '#c8e6c9',
    '--color-border-light': '#e8f5e9',

    // Text
    '--color-text': '#1a2e1a',
    '--color-text-secondary': '#4a6741',
    '--color-text-muted': '#7c9a72',
    '--color-text-inverse': '#ffffff',

    // Semantic
    '--color-success': '#2d6a4f',
    '--color-warning': '#e9c46a',
    '--color-error': '#d62828',
    '--color-info': '#457b9d',

    // Badges
    '--color-badge-new': '#2d6a4f',
    '--color-badge-sale': '#d62828',
    '--color-badge-premium': '#d4a373',
    '--color-badge-eco': '#40916c',

    // Shadows
    '--shadow-sm': '0 1px 3px rgba(45, 106, 79, 0.08)',
    '--shadow-md': '0 4px 12px rgba(45, 106, 79, 0.12)',
    '--shadow-lg': '0 8px 30px rgba(45, 106, 79, 0.15)',
    '--shadow-xl': '0 20px 60px rgba(45, 106, 79, 0.2)',

    // Radius
    '--radius-sm': '6px',
    '--radius-md': '12px',
    '--radius-lg': '16px',
    '--radius-xl': '24px',
    '--radius-full': '9999px',

    // Typography
    '--font-primary': "'Inter', 'Segoe UI', system-ui, sans-serif",
    '--font-display': "'Playfair Display', Georgia, serif",

    // Gradients
    '--gradient-primary': 'linear-gradient(135deg, #2d6a4f 0%, #40916c 50%, #52b788 100%)',
    '--gradient-hero': 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 40%, #40916c 100%)',
    '--gradient-card': 'linear-gradient(180deg, rgba(45, 106, 79, 0.02) 0%, rgba(45, 106, 79, 0.06) 100%)',

    // Transitions
    '--transition-fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-normal': '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-slow': '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
