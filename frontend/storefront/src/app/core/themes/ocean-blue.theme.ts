import { Theme } from './theme.model';

export const oceanBlueTheme: Theme = {
  name: 'ocean-blue',
  displayName: 'Ocean Blue',
  description: 'A calming ocean-inspired theme with deep blue tones',
  properties: {
    '--color-primary': '#1d4e89',
    '--color-primary-light': '#4a90d9',
    '--color-primary-dark': '#0f2d50',
    '--color-primary-50': '#eff6ff',
    '--color-primary-100': '#dbeafe',
    '--color-primary-200': '#bfdbfe',
    '--color-primary-300': '#93c5fd',
    '--color-primary-400': '#60a5fa',
    '--color-primary-500': '#3b82f6',
    '--color-primary-600': '#2563eb',
    '--color-primary-700': '#1d4ed8',
    '--color-primary-800': '#1e40af',
    '--color-primary-900': '#1e3a8a',

    '--color-accent': '#f59e0b',
    '--color-accent-light': '#fbbf24',
    '--color-accent-dark': '#d97706',

    '--color-bg': '#f8fafc',
    '--color-bg-secondary': '#f0f7ff',
    '--color-bg-tertiary': '#e0f2fe',
    '--color-surface': '#ffffff',
    '--color-surface-hover': '#f0f7ff',
    '--color-border': '#bfdbfe',
    '--color-border-light': '#e0f2fe',

    '--color-text': '#0f172a',
    '--color-text-secondary': '#334155',
    '--color-text-muted': '#64748b',
    '--color-text-inverse': '#ffffff',

    '--color-success': '#059669',
    '--color-warning': '#f59e0b',
    '--color-error': '#dc2626',
    '--color-info': '#1d4e89',

    '--color-badge-new': '#1d4e89',
    '--color-badge-sale': '#dc2626',
    '--color-badge-premium': '#f59e0b',
    '--color-badge-eco': '#059669',

    '--shadow-sm': '0 1px 3px rgba(29, 78, 137, 0.08)',
    '--shadow-md': '0 4px 12px rgba(29, 78, 137, 0.12)',
    '--shadow-lg': '0 8px 30px rgba(29, 78, 137, 0.15)',
    '--shadow-xl': '0 20px 60px rgba(29, 78, 137, 0.2)',

    '--radius-sm': '6px',
    '--radius-md': '12px',
    '--radius-lg': '16px',
    '--radius-xl': '24px',
    '--radius-full': '9999px',

    '--font-primary': "'Inter', 'Segoe UI', system-ui, sans-serif",
    '--font-display': "'Playfair Display', Georgia, serif",

    '--gradient-primary': 'linear-gradient(135deg, #1d4e89 0%, #2563eb 50%, #4a90d9 100%)',
    '--gradient-hero': 'linear-gradient(135deg, #0f2d50 0%, #1d4e89 40%, #2563eb 100%)',
    '--gradient-card': 'linear-gradient(180deg, rgba(29, 78, 137, 0.02) 0%, rgba(29, 78, 137, 0.06) 100%)',

    '--transition-fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-normal': '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-slow': '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
