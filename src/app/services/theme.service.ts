import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  dark = signal(false);

  constructor() {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {}

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.apply(saved ? saved === 'dark' : prefersDark);
  }

  toggle(): void {
    const next = !this.dark();
    this.apply(next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  }

  private apply(dark: boolean): void {
    this.dark.set(dark);
    document.documentElement.classList.toggle('ion-palette-dark', dark);
  }
}