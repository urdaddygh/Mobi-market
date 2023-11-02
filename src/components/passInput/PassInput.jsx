import React from "react";
import s from "./styles.module.css";

const Passinput = ({
  placeholder,
  value,
  onChange,
  name,
  padding,
  id,
  type,
  letteSpacing,
  fontSize,
  color,
  margin,
  onBlur
}) => {
  return (
      <input
        style={{ padding: padding, letterSpacing:letteSpacing, fontSize:fontSize, color:color, margin:margin }}
        className={s.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        id={id}
        onBlur={onBlur}
      />
  );
};

export default Passinput;
