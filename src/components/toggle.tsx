import React from 'react';

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, value, onChange }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!value);
    }
  };

  return (
    <div
      className="rounded flex items-center space-x-2 cursor-pointer"
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
      aria-label={label}
    >
      <span className="md:min-w-[96] 3xl:min-w-0 font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <div
        className={`outline-slate w-12 h-6 flex items-center rounded-full p-1 transition-colors ${value ? 'bg-slate-500' : 'bg-gray-300'}`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
      </div>
    </div>
  );
};

export default Toggle;
