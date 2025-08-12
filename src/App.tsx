import  { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Timer } from 'lucide-react';
import { ThemeSelector } from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme.ts';
import { colorThemes } from './types/theme';

type TimerMode = 'countdown' | 'countup';
type TimerState = 'stopped' | 'running' | 'paused';

function App() {
  const { theme } = useTheme();
  const [mode, setMode] = useState<TimerMode>('countdown');
  const [state, setState] = useState<TimerState>('stopped');
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds for countdown
  const [countUpTime, setCountUpTime] = useState(0); // count up time in seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get current theme colors
  const currentColors = colorThemes[theme.color][theme.mode];

  // Format time for display
  const formatTime = (seconds: number, showHours = false): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (showHours) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current time based on mode
  // const getCurrentTime = (): number => {
  //   return mode === 'countdown' ? time : countUpTime;
  // };

  // Get formatted display time
  const getDisplayTime = (): string => {
    if (mode === 'countdown') {
      return formatTime(time);
    } else {
      return formatTime(countUpTime, true);
    }
  };

  // Start timer
  const startTimer = () => {
    setState('running');
    intervalRef.current = setInterval(() => {
      if (mode === 'countdown') {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            // Auto reset when countdown reaches 0
            setTimeout(() => {
              setTime(25 * 60);
              setState('stopped');
            }, 100);
            return 0;
          }
          return prevTime - 1;
        });
      } else {
        setCountUpTime((prevTime) => {
          const maxTime = 24 * 60 * 60; // 24 hours
          if (prevTime >= maxTime) {
            return maxTime;
          }
          return prevTime + 1;
        });
      }
    }, 1000);
  };

  // Stop timer
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState('paused');
  };

  // Reset timer
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState('stopped');
    if (mode === 'countdown') {
      setTime(25 * 60);
    } else {
      setCountUpTime(0);
    }
  };

  // Switch modes
  const switchMode = (newMode: TimerMode) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setMode(newMode);
    setState('stopped');
    if (newMode === 'countdown') {
      setTime(25 * 60);
    } else {
      setCountUpTime(0);
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Get progress percentage for countdown mode
  const getProgress = (): number => {
    if (mode === 'countdown') {
      return ((25 * 60 - time) / (25 * 60)) * 100;
    }
    return (countUpTime / (24 * 60 * 60)) * 100;
  };

  return (
    <div className={`min-h-screen transition-all duration-500 flex items-center justify-center p-4 relative ${
      theme.mode === 'light' 
        ? `bg-gradient-to-br from-${currentColors.secondary} via-white to-${currentColors.secondary}`
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      <ThemeSelector />
      
      <div className={`rounded-3xl shadow-2xl p-8 w-full max-w-md transition-all duration-300 ${
        theme.mode === 'light'
          ? 'bg-white border border-gray-100'
          : 'bg-gray-800 border border-gray-700'
      }`}>
        {/* Mode Selector */}
        <div className={`flex rounded-2xl p-1 mb-8 ${
          theme.mode === 'light' ? 'bg-gray-100' : 'bg-gray-700'
        }`}>
          <button
            onClick={() => switchMode('countdown')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              mode === 'countdown'
                ? `${theme.mode === 'light' ? 'bg-white' : 'bg-gray-600'} text-${currentColors.primary} shadow-md`
                : `${theme.mode === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-300 hover:text-white'}`
            }`}
          >
            <Timer size={18} />
            Countdown
          </button>
          <button
            onClick={() => switchMode('countup')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              mode === 'countup'
                ? `${theme.mode === 'light' ? 'bg-white' : 'bg-gray-600'} text-${currentColors.primary} shadow-md`
                : `${theme.mode === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-300 hover:text-white'}`
            }`}
          >
            <Clock size={18} />
            Count Up
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="relative">
            {/* Progress Ring */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className={theme.mode === 'light' ? 'text-gray-200' : 'text-gray-600'}
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className={`text-${currentColors.primary} transition-colors duration-300`}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 45}`,
                    strokeDashoffset: `${2 * Math.PI * 45 * (1 - getProgress() / 100)}`,
                    transition: 'stroke-dashoffset 1s ease-in-out'
                  }}
                />
              </svg>
              {/* Time display in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-4xl font-mono font-bold text-${currentColors.primaryText} ${
                    state === 'running' ? 'animate-pulse' : ''
                  }`}>
                    {getDisplayTime()}
                  </div>
                  <div className={`text-sm mt-1 font-medium ${
                    theme.mode === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {mode === 'countdown' ? 'Countdown' : 'Count Up'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`w-3 h-3 rounded-full ${
              state === 'running' ? 'bg-green-500 animate-pulse' : 
              state === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'
            }`}></div>
            <span className={`text-sm font-medium capitalize ${
              theme.mode === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              {state === 'running' ? 'Running' : state === 'paused' ? 'Paused' : 'Stopped'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {state === 'stopped' || state === 'paused' ? (
            <button
              onClick={startTimer}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 bg-${currentColors.primary} hover:bg-${currentColors.primaryHover}`}
            >
              <Play size={20} />
              {state === 'paused' ? 'Continue' : 'Start'}
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Pause size={20} />
              Stop
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        {/* Mode description */}
        <div className={`mt-6 text-center text-sm ${
          theme.mode === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {mode === 'countdown' 
            ? 'Timer will automatically reset when reaching 0' 
            : 'Maximum duration: 24 hours'
          }
        </div>
      </div>
    </div>
  );
}

export default App;