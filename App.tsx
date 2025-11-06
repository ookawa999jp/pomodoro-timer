
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mode } from './types';
import { DEFAULT_TIMES, LONG_BREAK_INTERVAL, NOTIFICATION_SOUND_B64 } from './constants';
import ModeSelector from './components/ModeSelector';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>(Mode.Work);
  const [time, setTime] = useState(DEFAULT_TIMES[Mode.Work] * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const notificationSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    notificationSound.current = new Audio(NOTIFICATION_SOUND_B64);
  }, []);

  const switchMode = useCallback((newMode: Mode) => {
    setIsRunning(false);
    setMode(newMode);
    setTime(DEFAULT_TIMES[newMode] * 60);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      if (notificationSound.current) {
        notificationSound.current.play();
      }

      if (mode === Mode.Work) {
        const newPomodorosCompleted = pomodorosCompleted + 1;
        setPomodorosCompleted(newPomodorosCompleted);
        if (newPomodorosCompleted % LONG_BREAK_INTERVAL === 0) {
          switchMode(Mode.LongBreak);
        } else {
          switchMode(Mode.ShortBreak);
        }
      } else {
        switchMode(Mode.Work);
      }
      return;
    }

    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, isRunning, mode, pomodorosCompleted, switchMode]);

  useEffect(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - ${
      mode.charAt(0).toUpperCase() + mode.slice(1)
    }`;
  }, [time, mode]);


  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(DEFAULT_TIMES[mode] * 60);
  };
  
  const handleModeSelect = (selectedMode: Mode) => {
    switchMode(selectedMode);
  };
  
  const totalDuration = DEFAULT_TIMES[mode] * 60;

  const modeColors: { [key in Mode]: string } = {
    [Mode.Work]: 'text-red-400',
    [Mode.ShortBreak]: 'text-cyan-400',
    [Mode.LongBreak]: 'text-emerald-400',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white font-sans transition-colors duration-500">
      <main className="flex flex-col items-center bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md">
        <h1 className={`text-2xl font-bold mb-4 ${modeColors[mode]}`}>Pomodoro Timer</h1>
        <ModeSelector currentMode={mode} onSelectMode={handleModeSelect} />
        <TimerDisplay
          timeInSeconds={time}
          totalDurationInSeconds={totalDuration}
          mode={mode}
        />
        <Controls
          isRunning={isRunning}
          onStartPause={handleStartPause}
          onReset={handleReset}
          mode={mode}
        />
        <div className="mt-6 text-center">
            <p className="text-slate-400">Completed Sessions: <span className="font-bold text-white">{pomodorosCompleted}</span></p>
        </div>
      </main>
      <footer className="mt-8 text-slate-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
