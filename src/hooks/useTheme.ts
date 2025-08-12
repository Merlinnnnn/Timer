import { useState, useEffect } from 'react';
import type { Theme, ThemeMode, ColorTheme } from '../types/theme';

const THEME_STORAGE_KEY = 'timer-theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fall back to default if parsing fails
      }
    }
    
    // Default theme
    return {
      mode: 'light' as ThemeMode,
      color: 'indigo' as ColorTheme
    };
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    
    // Apply dark mode class to document
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setThemeMode = (mode: ThemeMode) => {
    setTheme(prev => ({ ...prev, mode }));
  };

  const setColorTheme = (color: ColorTheme) => {
    setTheme(prev => ({ ...prev, color }));
  };

  const toggleMode = () => {
    setThemeMode(theme.mode === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    setTheme,
    setThemeMode,
    setColorTheme,
    toggleMode
  };
};