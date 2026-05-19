import { Theme } from './theme.model';

export const luxuryNoirTheme: Theme = {
  name: 'luxury-noir',
  displayName: 'Luxury Noir',
  description: 'A premium dark-accented theme with sophisticated elegance',
  properties: {
    // Primary palette — Rich black & gold
    '--color-primary': '#1a1a2e',
    '--color-primary-light': '#16213e',
    '--color-primary-dark': '#0f0f1a',
    '--color-primary-50': '#f8f7fa',
    '--color-primary-100': '#eeedf2',
    '--color-primary-200': '#d5d3de',
    '--color-primary-300': '#b3b0c4',
    '--color-primary-400': '#8b87a3',
    '--color-primary-500': '#6b6785',
    '--color-primary-600': '#4a4662',
    '--color-primary-700': '#35334a',
    '--color-primary-800': '#242237',
    '--color-primary-900': '#1a1a2e',

    // Accent — Luxurious gold
    '--color-accent': '#c9a96e',
    '--color-accent-light': '#dfc08a',
    '--color-accent-dark': '#a68744',

    // Backgrounds — Clean whites with warmth
    '--color-bg': '#fafafa',
    '--color-bg-secondary': '#f5f5f7',
    '--color-bg-tertiary': '#eeeff1',
    '--color-surface': '#ffffff',
    '--color-surface-hover': '#f8f8fa',
    '--color-border': '#e8e8ec',
    '--color-border-light': '#f0f0f3',

    // Text — Sharp contrasts
    '--color-text': '#1a1a2e',
    '--color-text-secondary': '#4a4a5a',
    '--color-text-muted': '#8a8a9a',
    '--color-text-inverse': '#ffffff',

    // Semantic
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-error': '#ef4444',
    '--color-info': '#3b82f6',

    // Badges
    '--color-badge-new': '#1a1a2e',
    '--color-badge-sale': '#ef4444',
    '--color-badge-premium': '#c9a96e',
    '--color-badge-eco': '#10b981',

    // Shadows — Softer, more refined
    '--shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
    '--shadow-md': '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
    '--shadow-lg': '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)',
    '--shadow-xl': '0 24px 60px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.06)',

    // Radius — Subtler, more refined
    '--radius-sm': '4px',
    '--radius-md': '8px',
    '--radius-lg': '12px',
    '--radius-xl': '20px',
    '--radius-full': '9999px',

    // Typography — Premium fonts
    '--font-primary': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    '--font-display': "'Playfair Display', 'Georgia', serif",

    // Gradients
    '--gradient-primary': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    '--gradient-hero': 'linear-gradient(160deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 100%)',
    '--gradient-card': 'linear-gradient(180deg, rgba(26, 26, 46, 0.01) 0%, rgba(26, 26, 46, 0.03) 100%)',

    // Transitions — Smooth & elegant
    '--transition-fast': '150ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    '--transition-normal': '300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    '--transition-slow': '500ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  }
};
