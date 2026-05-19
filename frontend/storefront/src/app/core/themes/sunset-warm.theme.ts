import { Theme } from './theme.model';

export const sunsetWarmTheme: Theme = {
  name: 'sunset-warm',
  displayName: 'Sunset Warm',
  description: 'A warm, inviting theme with terracotta and amber tones',
  properties: {
    '--color-primary': '#9c4221',
    '--color-primary-light': '#dc7633',
    '--color-primary-dark': '#6b2d14',
    '--color-primary-50': '#fff7ed',
    '--color-primary-100': '#ffedd5',
    '--color-primary-200': '#fed7aa',
    '--color-primary-300': '#fdba74',
    '--color-primary-400': '#fb923c',
    '--color-primary-500': '#f97316',
    '--color-primary-600': '#ea580c',
    '--color-primary-700': '#c2410c',
    '--color-primary-800': '#9a3412',
    '--color-primary-900': '#7c2d12',

    '--color-accent': '#7c3aed',
    '--color-accent-light': '#a78bfa',
    '--color-accent-dark': '#5b21b6',

    '--color-bg': '#fffbf7',
    '--color-bg-secondary': '#fef3e2',
    '--color-bg-tertiary': '#fde8cd',
    '--color-surface': '#ffffff',
    '--color-surface-hover': '#fff7ed',
    '--color-border': '#fed7aa',
    '--color-border-light': '#ffedd5',

    '--color-text': '#292524',
    '--color-text-secondary': '#57534e',
    '--color-text-muted': '#78716c',
    '--color-text-inverse': '#ffffff',

    '--color-success': '#059669',
    '--color-warning': '#f59e0b',
    '--color-error': '#dc2626',
    '--color-info': '#0284c7',

    '--color-badge-new': '#9c4221',
    '--color-badge-sale': '#dc2626',
    '--color-badge-premium': '#7c3aed',
    '--color-badge-eco': '#059669',

    '--shadow-sm': '0 1px 3px rgba(156, 66, 33, 0.08)',
    '--shadow-md': '0 4px 12px rgba(156, 66, 33, 0.12)',
    '--shadow-lg': '0 8px 30px rgba(156, 66, 33, 0.15)',
    '--shadow-xl': '0 20px 60px rgba(156, 66, 33, 0.2)',

    '--radius-sm': '6px',
    '--radius-md': '12px',
    '--radius-lg': '16px',
    '--radius-xl': '24px',
    '--radius-full': '9999px',

    '--font-primary': "'Inter', 'Segoe UI', system-ui, sans-serif",
    '--font-display': "'Playfair Display', Georgia, serif",

    '--gradient-primary': 'linear-gradient(135deg, #9c4221 0%, #dc7633 50%, #f59e0b 100%)',
    '--gradient-hero': 'linear-gradient(135deg, #6b2d14 0%, #9c4221 40%, #dc7633 100%)',
    '--gradient-card': 'linear-gradient(180deg, rgba(156, 66, 33, 0.02) 0%, rgba(156, 66, 33, 0.06) 100%)',

    '--transition-fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-normal': '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-slow': '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
