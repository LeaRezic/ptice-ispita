import React from 'react';

interface SelectProps {
  label: string;
  options: string[];
  value?: string; // controlled value
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="min-w-full md:min-w-0 flex gap-x-2 md:items-center flex-col md:flex-row">
      <label className="font-medium text-gray-700 whitespace-nowrap">{label}</label>
      <select
        className="text-sm flex-1 md:flex-initial border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
