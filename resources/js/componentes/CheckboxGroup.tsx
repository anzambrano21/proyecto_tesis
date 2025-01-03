import React from 'react';

interface CheckboxGroupProps {
  title: string;
  options: string[];
  name: string;
  values: string[];
  onChange: (name: string, value: string, checked: boolean) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, options, name, values, onChange }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {options.map((option, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`${name}-${index}`}
              name={name}
              value={option}
              checked={values.includes(option)}
              onChange={(e) => onChange(name, option, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={`${name}-${index}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

