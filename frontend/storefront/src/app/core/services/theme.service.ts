import { Injectable, signal, computed, effect } from '@angular/core';
import { Theme, luxuryNoirTheme, ecoGreenTheme, oceanBlueTheme, sunsetWarmTheme } from '../themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'storefront-theme';

  private readonly availableThemes: Theme[] = [
    luxuryNoirTheme,
    ecoGreenTheme,
    oceanBlueTheme,
    sunsetWarmTheme,
  ];

  private readonly activeThemeName = signal<string>(this.loadSavedTheme());

  readonly currentTheme = computed(() =>
    this.availableThemes.find(t => t.name === this.activeThemeName()) ?? sunsetWarmTheme
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

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    Object.entries(theme.properties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    root.setAttribute('data-theme', theme.name);
  }

  private loadSavedTheme(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.STORAGE_KEY) ?? 'sunset-warm';
    }
    return 'sunset-warm';
  }
}
