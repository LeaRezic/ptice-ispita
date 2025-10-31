import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ label, placeholder, value, onChange }) => {
  const id = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="min-w-full md:min-w-0 flex gap-x-2 md:items-center flex-col md:flex-row">
      <label htmlFor={id} className="min-w-[96] font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{label}</label>
      <div className="relative flex-1">
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="outline-slate text-sm w-full border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded p-2 pr-8"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
            aria-label="Clear search"
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
      </div>
    </div>
  );
};

export default Input;
