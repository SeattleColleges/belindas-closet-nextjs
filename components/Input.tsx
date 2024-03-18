import React from "react";
import styles from "../app/add-product-page/page.module.css";

interface InputProps {
  label: string;
  value: string | number;
  type: string;
  onChange: any;
  style: any;
  labelTextColor?: string;
}

const InputText: React.FC<InputProps> = ({ label, value, type, onChange, style, labelTextColor }) => {
  return (
    <div>
      <label className={styles.inputLabel} style={{ color: labelTextColor || '#f0f0f0' }}>{label}:</label>
      <input
        className={styles.inputField}
        type={type}
        value={value}
        onChange={onChange}
        style={style}
        />
    </div>
  );
};

export default InputText;
