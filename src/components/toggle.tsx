import React from 'react';

interface ToggleProps {
  label: string;
  value: boolean; // true = yes, false = no
  onChange: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="font-medium text-gray-700">{label}</span>
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
          value ? 'bg-green-500' : 'bg-gray-300'
        }`}
        onClick={() => onChange(!value)}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            value ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  );
};

export default Toggle;
