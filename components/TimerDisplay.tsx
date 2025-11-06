
import React from 'react';
import { Mode } from '../types';

interface TimerDisplayProps {
  timeInSeconds: number;
  totalDurationInSeconds: number;
  mode: Mode;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeInSeconds,
  totalDurationInSeconds,
  mode,
}) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const RADIUS = 110;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progress = timeInSeconds / totalDurationInSeconds;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const modeColors: { [key in Mode]: { text: string; progress: string } } = {
    [Mode.Work]: { text: 'text-red-400', progress: 'stroke-red-400' },
    [Mode.ShortBreak]: { text: 'text-cyan-400', progress: 'stroke-cyan-400' },
    [Mode.LongBreak]: { text: 'text-emerald-400', progress: 'stroke-emerald-400' },
  };

  return (
    <div className="relative my-10 flex items-center justify-center w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]">
      <svg className="absolute w-full h-full" viewBox="0 0 250 250">
        <circle
          cx="125"
          cy="125"
          r={RADIUS}
          className="stroke-slate-700"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="125"
          cy="125"
          r={RADIUS}
          className={`${modeColors[mode].progress} transition-all duration-1000`}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 125 125)"
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-5xl sm:text-7xl font-mono font-bold tracking-tighter">
          {formatTime(timeInSeconds)}
        </h2>
      </div>
    </div>
  );
};

export default TimerDisplay;
