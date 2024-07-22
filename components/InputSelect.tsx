import React from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';

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
      <InputLabel>{label}:</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          style={style}
        >
          {options.map((option : any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
    </div>
  );
};

export default InputSelect;