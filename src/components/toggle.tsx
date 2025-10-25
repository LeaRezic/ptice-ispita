import React from 'react';

interface ToggleProps {
  label: string;
  value: boolean; // true = yes, false = no
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
      className="outline-slate rounded flex items-center space-x-4 cursor-pointer"
      onClick={() => onChange(!value)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="switch"
      aria-checked={value}
      aria-label={label}
    >
      <span className="font-medium text-gray-700">
        {label}
      </span>
      <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${value ? 'bg-slate-500' : 'bg-gray-300'}`}>
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
      </div>
    </div>
  );
};

export default Toggle;
