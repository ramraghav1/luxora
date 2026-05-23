import { AdminTheme } from './theme.model';

export const pinkEcoTheme: AdminTheme = {
  name: 'pink-eco',
  displayName: 'Blush & Green',
  description: 'Soft pink accents with eco green for a fresh, modern vibe',
  preview: { sidebar: '#1b4332', accent: '#e8508a', surface: '#fdf2f8' },
  properties: {
    '--sidebar-bg': '#1b4332',
    '--sidebar-text': 'rgba(255, 255, 255, 0.7)',
    '--sidebar-text-muted': 'rgba(255, 255, 255, 0.35)',
    '--sidebar-active-bg': 'rgba(232, 80, 138, 0.15)',
    '--sidebar-active-text': '#f9a8d4',
    '--sidebar-hover-bg': 'rgba(255, 255, 255, 0.06)',
    '--sidebar-border': 'rgba(255, 255, 255, 0.08)',
    '--sidebar-brand': '#f9a8d4',

    '--topbar-bg': '#ffffff',
    '--topbar-border': '#fce7f3',
    '--topbar-text': '#1b4332',
    '--topbar-icon': '#6b7280',

    '--content-bg': '#fdf2f8',
    '--surface': '#ffffff',
    '--surface-hover': '#fef7fb',
    '--border': '#fce7f3',
    '--border-light': '#fdf2f8',

    '--accent': '#e8508a',
    '--accent-light': 'rgba(232, 80, 138, 0.12)',
    '--accent-dark': '#be185d',
    '--accent-bg': 'rgba(232, 80, 138, 0.06)',

    '--text-primary': '#1b4332',
    '--text-secondary': '#374151',
    '--text-muted': '#9ca3af',

    '--success': '#10b981',
    '--success-bg': '#d1fae5',
    '--warning': '#f59e0b',
    '--warning-bg': '#fef3c7',
    '--error': '#ef4444',
    '--error-bg': '#fee2e2',
    '--info': '#6366f1',
    '--info-bg': '#eef2ff',

    '--avatar-bg': '#2d6a4f',
    '--avatar-text': '#f9a8d4',

    '--shadow-sm': '0 1px 3px rgba(27, 67, 50, 0.05)',
    '--shadow-md': '0 4px 12px rgba(232, 80, 138, 0.06)',

    '--radius-sm': '8px',
    '--radius-md': '12px',
    '--radius-lg': '16px',
  }
};
