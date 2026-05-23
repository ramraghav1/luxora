export interface AdminTheme {
  name: string;
  displayName: string;
  description: string;
  preview: { sidebar: string; accent: string; surface: string };
  properties: AdminThemeProperties;
}

export interface AdminThemeProperties {
  // Sidebar
  '--sidebar-bg': string;
  '--sidebar-text': string;
  '--sidebar-text-muted': string;
  '--sidebar-active-bg': string;
  '--sidebar-active-text': string;
  '--sidebar-hover-bg': string;
  '--sidebar-border': string;
  '--sidebar-brand': string;

  // Topbar
  '--topbar-bg': string;
  '--topbar-border': string;
  '--topbar-text': string;
  '--topbar-icon': string;

  // Content area
  '--content-bg': string;
  '--surface': string;
  '--surface-hover': string;
  '--border': string;
  '--border-light': string;

  // Accent
  '--accent': string;
  '--accent-light': string;
  '--accent-dark': string;
  '--accent-bg': string;

  // Text
  '--text-primary': string;
  '--text-secondary': string;
  '--text-muted': string;

  // Semantic
  '--success': string;
  '--success-bg': string;
  '--warning': string;
  '--warning-bg': string;
  '--error': string;
  '--error-bg': string;
  '--info': string;
  '--info-bg': string;

  // Avatar
  '--avatar-bg': string;
  '--avatar-text': string;

  // Shadows
  '--shadow-sm': string;
  '--shadow-md': string;

  // Radius
  '--radius-sm': string;
  '--radius-md': string;
  '--radius-lg': string;
}
