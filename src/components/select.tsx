import React from 'react';

interface SelectProps {
  label: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  const id = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="min-w-full md:min-w-0 flex gap-x-2 md:items-center flex-col md:flex-row">
      <label htmlFor={id} className="font-medium text-gray-700 whitespace-nowrap">{label}</label>
      <select
        id={id}
        className="outline-slate text-sm flex-1 3xl:flex-unset border border-gray-300 rounded p-2"
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
