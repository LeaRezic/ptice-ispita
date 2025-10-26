import React from 'react';

interface SelectProps {
  label: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  const id = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const defaultValue = options[0];

  return (
    <div className="min-w-full md:min-w-0 flex gap-x-2 md:items-center flex-col md:flex-row">
      <label htmlFor={id} className="min-w-[96] 3xl:min-w-0 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{label}</label>
      <div className="relative flex-1 3xl:flex-initial">
        <select
          id={id}
          className={`outline-slate h-[40px] text-sm w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded p-2 appearance-none ${
            value && value !== defaultValue ? 'pr-14' : 'pr-8'
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Clear button - only when needed */}
        {value && value !== defaultValue && (
          <button
            onClick={() => onChange(defaultValue)}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10 cursor-pointer"
            aria-label={`Clear ${label}`}
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Dropdown arrow - always visible */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
