
import React from 'react';
import { ICONS } from '../constants';
import { Mode } from '../types';

interface ControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
  mode: Mode;
}

const Controls: React.FC<ControlsProps> = ({ isRunning, onStartPause, onReset, mode }) => {

  const modeColors: { [key in Mode]: { bg: string, hoverBg: string, text: string } } = {
    [Mode.Work]: { bg: 'bg-red-500', hoverBg: 'hover:bg-red-600', text: 'text-white' },
    [Mode.ShortBreak]: { bg: 'bg-cyan-500', hoverBg: 'hover:bg-cyan-600', text: 'text-white' },
    [Mode.LongBreak]: { bg: 'bg-emerald-500', hoverBg: 'hover:bg-emerald-600', text: 'text-white' },
  };

  const buttonClass = `
    ${modeColors[mode].bg} 
    ${modeColors[mode].hoverBg} 
    ${modeColors[mode].text} 
    font-bold 
    py-3 px-12 
    rounded-full 
    uppercase 
    tracking-wider 
    shadow-lg 
    transform 
    hover:scale-105 
    focus:outline-none 
    focus:ring-4 
    focus:ring-opacity-50 
    transition-all 
    duration-300 
    ease-in-out
    flex items-center justify-center
  `;
  
  const ringColor: { [key in Mode]: string } = {
    [Mode.Work]: 'focus:ring-red-400',
    [Mode.ShortBreak]: 'focus:ring-cyan-400',
    [Mode.LongBreak]: 'focus:ring-emerald-400',
  };


  return (
    <div className="flex items-center space-x-6">
      <button onClick={onReset} className="text-slate-400 hover:text-white transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500">
        {ICONS.reset}
      </button>
      <button onClick={onStartPause} className={`${buttonClass} ${ringColor[mode]}`}>
        {isRunning ? ICONS.pause : ICONS.play}
        <span className="ml-2 text-xl">{isRunning ? 'Pause' : 'Start'}</span>
      </button>
    </div>
  );
};

export default Controls;
