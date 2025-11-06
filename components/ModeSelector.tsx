
import React from 'react';
import { Mode } from '../types';

interface ModeSelectorProps {
  currentMode: Mode;
  onSelectMode: (mode: Mode) => void;
}

const ModeButton: React.FC<{
  mode: Mode;
  label: string;
  currentMode: Mode;
  onClick: (mode: Mode) => void;
}> = ({ mode, label, currentMode, onClick }) => {
  const isActive = currentMode === mode;
  
  const modeColors: { [key in Mode]: string } = {
    [Mode.Work]: 'bg-red-500',
    [Mode.ShortBreak]: 'bg-cyan-500',
    [Mode.LongBreak]: 'bg-emerald-500',
  };

  const baseClasses = 'px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800';
  const activeClasses = `${modeColors[mode]} text-white shadow-md`;
  const inactiveClasses = 'text-slate-400 bg-slate-700 hover:bg-slate-600';
  const ringClasses = {
      [Mode.Work]: 'focus:ring-red-400',
      [Mode.ShortBreak]: 'focus:ring-cyan-400',
      [Mode.LongBreak]: 'focus:ring-emerald-400',
  }

  return (
    <button
      onClick={() => onClick(mode)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${ringClasses[mode]}`}
    >
      {label}
    </button>
  );
};

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onSelectMode }) => {
  return (
    <div className="flex space-x-2 bg-slate-700/50 p-1.5 rounded-full">
      <ModeButton mode={Mode.Work} label="Work" currentMode={currentMode} onClick={onSelectMode} />
      <ModeButton mode={Mode.ShortBreak} label="Short Break" currentMode={currentMode} onClick={onSelectMode} />
      <ModeButton mode={Mode.LongBreak} label="Long Break" currentMode={currentMode} onClick={onSelectMode} />
    </div>
  );
};

export default ModeSelector;
