import React from 'react';
import styles from '../app/add-product-page/page.module.css';

interface InputSelectProps {
  label: string;
  value: string | number;
  options: any;
  onChange: any;
  style: any;
  labelTextColor?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({ label, value, options, onChange, style, labelTextColor }) => {
  return (
    <div>
      <label className={styles.inputLabel} style={{ color: labelTextColor || '#f0f0f0' }}>{label}:</label>
      <select 
        className={styles.inputField}
        value={value}
        onChange={onChange}
        style={style}
      >
        {options.map((option : any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;