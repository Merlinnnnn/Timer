export type ThemeMode = 'light' | 'dark';
export type ColorTheme = 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'cyan';

export interface Theme {
  mode: ThemeMode;
  color: ColorTheme;
}

export const colorThemes = {
  indigo: {
    name: 'Indigo',
    light: {
      primary: 'indigo-500',
      primaryHover: 'indigo-600',
      primaryText: 'indigo-600',
      secondary: 'indigo-100',
    },
    dark: {
      primary: 'indigo-400',
      primaryHover: 'indigo-300',
      primaryText: 'indigo-400',
      secondary: 'indigo-900/30',
    }
  },
  emerald: {
    name: 'Emerald',
    light: {
      primary: 'emerald-500',
      primaryHover: 'emerald-600',
      primaryText: 'emerald-600',
      secondary: 'emerald-100',
    },
    dark: {
      primary: 'emerald-400',
      primaryHover: 'emerald-300',
      primaryText: 'emerald-400',
      secondary: 'emerald-900/30',
    }
  },
  rose: {
    name: 'Rose',
    light: {
      primary: 'rose-500',
      primaryHover: 'rose-600',
      primaryText: 'rose-600',
      secondary: 'rose-100',
    },
    dark: {
      primary: 'rose-400',
      primaryHover: 'rose-300',
      primaryText: 'rose-400',
      secondary: 'rose-900/30',
    }
  },
  amber: {
    name: 'Amber',
    light: {
      primary: 'amber-500',
      primaryHover: 'amber-600',
      primaryText: 'amber-600',
      secondary: 'amber-100',
    },
    dark: {
      primary: 'amber-400',
      primaryHover: 'amber-300',
      primaryText: 'amber-400',
      secondary: 'amber-900/30',
    }
  },
  purple: {
    name: 'Purple',
    light: {
      primary: 'purple-500',
      primaryHover: 'purple-600',
      primaryText: 'purple-600',
      secondary: 'purple-100',
    },
    dark: {
      primary: 'purple-400',
      primaryHover: 'purple-300',
      primaryText: 'purple-400',
      secondary: 'purple-900/30',
    }
  },
  cyan: {
    name: 'Cyan',
    light: {
      primary: 'cyan-500',
      primaryHover: 'cyan-600',
      primaryText: 'cyan-600',
      secondary: 'cyan-100',
    },
    dark: {
      primary: 'cyan-400',
      primaryHover: 'cyan-300',
      primaryText: 'cyan-400',
      secondary: 'cyan-900/30',
    }
  }
} as const;