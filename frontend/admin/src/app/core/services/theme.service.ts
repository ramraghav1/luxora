import { Injectable, signal, computed, effect } from '@angular/core';
import { AdminTheme, luxoraDefaultTheme, ecoGreenTheme, sunsetWarmTheme, pinkEcoTheme } from '../themes';

@Injectable({
  providedIn: 'root'
})
export class AdminThemeService {
  private readonly STORAGE_KEY = 'admin-theme';

  private readonly availableThemes: AdminTheme[] = [
    luxoraDefaultTheme,
    ecoGreenTheme,
    sunsetWarmTheme,
    pinkEcoTheme,
  ];

  private readonly activeThemeName = signal<string>(this.loadSavedTheme());

  readonly currentTheme = computed(() =>
    this.availableThemes.find(t => t.name === this.activeThemeName()) ?? luxoraDefaultTheme
  );

  readonly themes = computed(() => this.availableThemes);

  constructor() {
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  setTheme(themeName: string): void {
    const theme = this.availableThemes.find(t => t.name === themeName);
    if (theme) {
      this.activeThemeName.set(themeName);
      localStorage.setItem(this.STORAGE_KEY, themeName);
    }
  }

  /** For future tenant-based theming — override from API */
  setTenantTheme(themeName: string): void {
    this.setTheme(themeName);
  }

  private applyTheme(theme: AdminTheme): void {
    const root = document.documentElement;
    Object.entries(theme.properties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    root.setAttribute('data-admin-theme', theme.name);
  }

  private loadSavedTheme(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.STORAGE_KEY) ?? 'luxora-default';
    }
    return 'luxora-default';
  }
}
