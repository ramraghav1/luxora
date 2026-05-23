import { AdminTheme } from './theme.model';

export const ecoGreenTheme: AdminTheme = {
  name: 'eco-green',
  displayName: 'Eco Green',
  description: 'Fresh, natural greens for sustainability-focused brands',
  preview: { sidebar: '#1b4332', accent: '#40916c', surface: '#f0fdf4' },
  properties: {
    '--sidebar-bg': '#1b4332',
    '--sidebar-text': 'rgba(255, 255, 255, 0.7)',
    '--sidebar-text-muted': 'rgba(255, 255, 255, 0.35)',
    '--sidebar-active-bg': 'rgba(64, 145, 108, 0.2)',
    '--sidebar-active-text': '#95d5b2',
    '--sidebar-hover-bg': 'rgba(255, 255, 255, 0.06)',
    '--sidebar-border': 'rgba(255, 255, 255, 0.08)',
    '--sidebar-brand': '#95d5b2',

    '--topbar-bg': '#ffffff',
    '--topbar-border': '#d8f3dc',
    '--topbar-text': '#1b4332',
    '--topbar-icon': '#52796f',

    '--content-bg': '#f0fdf4',
    '--surface': '#ffffff',
    '--surface-hover': '#f7fdf9',
    '--border': '#d8f3dc',
    '--border-light': '#e8f8ee',

    '--accent': '#40916c',
    '--accent-light': 'rgba(64, 145, 108, 0.12)',
    '--accent-dark': '#2d6a4f',
    '--accent-bg': 'rgba(64, 145, 108, 0.06)',

    '--text-primary': '#1b4332',
    '--text-secondary': '#2d6a4f',
    '--text-muted': '#74a892',

    '--success': '#10b981',
    '--success-bg': '#d1fae5',
    '--warning': '#d97706',
    '--warning-bg': '#fef3c7',
    '--error': '#dc2626',
    '--error-bg': '#fee2e2',
    '--info': '#0284c7',
    '--info-bg': '#e0f2fe',

    '--avatar-bg': '#2d6a4f',
    '--avatar-text': '#95d5b2',

    '--shadow-sm': '0 1px 3px rgba(27, 67, 50, 0.06)',
    '--shadow-md': '0 4px 12px rgba(27, 67, 50, 0.08)',

    '--radius-sm': '6px',
    '--radius-md': '10px',
    '--radius-lg': '14px',
  }
};
