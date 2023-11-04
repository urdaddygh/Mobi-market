import React from "react";
import s from "./styles.module.css";

const Input = ({
  placeholder,
  value,
  valueLabel,
  onChange,
  name,
  type,
  forLabel,
  padding,
  id,
  margin,
  color,
  accept,
  readOnly
}) => {
  return (
    <div className={s.form_row}>
      <input
        style={{ padding: padding, margin:margin, borderColor:color, color:color }}
        className={s.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        id={id}
        required autoComplete="off"
        accept={accept}
        readOnly={readOnly}
      />
      <label className={s.label} htmlFor={forLabel}>
        {valueLabel}
      </label>
    </div>
  );
};

export default Input;
