import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.ts';
import { colorThemes, type ColorTheme } from '../types/theme';

export const ThemeSelector: React.FC = () => {
  const { theme, toggleMode, setColorTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4 flex items-center gap-3">
      {/* Color Theme Selector */}
      <div className="relative group">
        <button className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg">
          <Palette size={18} className="text-gray-600 dark:text-gray-300" />
        </button>
        
        {/* Color Theme Dropdown */}
        <div className="absolute top-full right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[200px]">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Color Theme</div>
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(colorThemes).map(([key, colorTheme]) => {
              const colorKey = key as ColorTheme;
              const isActive = theme.color === colorKey;
              const colors = colorTheme[theme.mode];
              
              return (
                <button
                  key={key}
                  onClick={() => setColorTheme(colorKey)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `bg-${colors.primary} text-white`
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full bg-${colors.primary}`}></div>
                  {colorTheme.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={toggleMode}
        className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg"
      >
        {theme.mode === 'light' ? (
          <Moon size={18} className="text-gray-600 dark:text-gray-300" />
        ) : (
          <Sun size={18} className="text-yellow-500" />
        )}
      </button>
    </div>
  );
};