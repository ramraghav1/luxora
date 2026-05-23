import { AdminTheme } from './theme.model';

export const luxoraDefaultTheme: AdminTheme = {
  name: 'luxora-default',
  displayName: 'Luxora Dark',
  description: 'Premium navy & gold — the classic LUXORA look',
  preview: { sidebar: '#1a1a2e', accent: '#c9a96e', surface: '#f5f5f7' },
  properties: {
    '--sidebar-bg': '#1a1a2e',
    '--sidebar-text': 'rgba(255, 255, 255, 0.6)',
    '--sidebar-text-muted': 'rgba(255, 255, 255, 0.3)',
    '--sidebar-active-bg': 'rgba(201, 169, 110, 0.1)',
    '--sidebar-active-text': '#c9a96e',
    '--sidebar-hover-bg': 'rgba(255, 255, 255, 0.05)',
    '--sidebar-border': 'rgba(255, 255, 255, 0.06)',
    '--sidebar-brand': '#c9a96e',

    '--topbar-bg': '#ffffff',
    '--topbar-border': '#e8e8ec',
    '--topbar-text': '#1a1a2e',
    '--topbar-icon': '#4a4a5a',

    '--content-bg': '#f5f5f7',
    '--surface': '#ffffff',
    '--surface-hover': '#f8f8fa',
    '--border': '#f0f0f3',
    '--border-light': '#f5f5f7',

    '--accent': '#c9a96e',
    '--accent-light': 'rgba(201, 169, 110, 0.15)',
    '--accent-dark': '#a68744',
    '--accent-bg': 'rgba(201, 169, 110, 0.08)',

    '--text-primary': '#1a1a2e',
    '--text-secondary': '#4a4a5a',
    '--text-muted': '#8a8a9a',

    '--success': '#10b981',
    '--success-bg': '#ecfdf5',
    '--warning': '#f59e0b',
    '--warning-bg': '#fef3c7',
    '--error': '#ef4444',
    '--error-bg': '#fef2f2',
    '--info': '#3b82f6',
    '--info-bg': '#eff6ff',

    '--avatar-bg': '#1a1a2e',
    '--avatar-text': '#c9a96e',

    '--shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.04)',
    '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.06)',

    '--radius-sm': '6px',
    '--radius-md': '8px',
    '--radius-lg': '10px',
  }
};
