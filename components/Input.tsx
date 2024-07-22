import React from "react";
import { InputLabel } from "@mui/material";

interface InputProps {
  label: string;
  value: string | number;
  type: string;
  onChange: any;
  style: any;
}

const InputText: React.FC<InputProps> = ({ label, value, type, onChange, style }) => {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={style}
        />
    </div>
  );
};

export default InputText;
