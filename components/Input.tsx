import React from "react";
import styles from "../app/add-product-page/page.module.css";

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
      <label className={styles.inputLabel}>{label}:</label>
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
