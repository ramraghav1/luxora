import { AdminTheme } from './theme.model';

export const sunsetWarmTheme: AdminTheme = {
  name: 'sunset-warm',
  displayName: 'Sunset Warm',
  description: 'Warm amber & terracotta tones for inviting brands',
  preview: { sidebar: '#44200d', accent: '#e07a2f', surface: '#fef7f0' },
  properties: {
    '--sidebar-bg': '#44200d',
    '--sidebar-text': 'rgba(255, 255, 255, 0.7)',
    '--sidebar-text-muted': 'rgba(255, 255, 255, 0.35)',
    '--sidebar-active-bg': 'rgba(224, 122, 47, 0.2)',
    '--sidebar-active-text': '#fbbf6e',
    '--sidebar-hover-bg': 'rgba(255, 255, 255, 0.06)',
    '--sidebar-border': 'rgba(255, 255, 255, 0.08)',
    '--sidebar-brand': '#fbbf6e',

    '--topbar-bg': '#ffffff',
    '--topbar-border': '#fde8d0',
    '--topbar-text': '#44200d',
    '--topbar-icon': '#7c4a1e',

    '--content-bg': '#fef7f0',
    '--surface': '#ffffff',
    '--surface-hover': '#fefaf6',
    '--border': '#fde8d0',
    '--border-light': '#fef0e0',

    '--accent': '#e07a2f',
    '--accent-light': 'rgba(224, 122, 47, 0.12)',
    '--accent-dark': '#b85d1a',
    '--accent-bg': 'rgba(224, 122, 47, 0.06)',

    '--text-primary': '#44200d',
    '--text-secondary': '#7c4a1e',
    '--text-muted': '#b08968',

    '--success': '#16a34a',
    '--success-bg': '#dcfce7',
    '--warning': '#d97706',
    '--warning-bg': '#fef3c7',
    '--error': '#dc2626',
    '--error-bg': '#fee2e2',
    '--info': '#0284c7',
    '--info-bg': '#e0f2fe',

    '--avatar-bg': '#7c4a1e',
    '--avatar-text': '#fbbf6e',

    '--shadow-sm': '0 1px 3px rgba(68, 32, 13, 0.06)',
    '--shadow-md': '0 4px 12px rgba(68, 32, 13, 0.08)',

    '--radius-sm': '6px',
    '--radius-md': '10px',
    '--radius-lg': '14px',
  }
};
