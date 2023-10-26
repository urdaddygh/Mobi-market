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
  color
}) => {
  return (
      <input
        style={{ padding: padding, letterSpacing:letteSpacing, fontSize:fontSize, color:color }}
        className={s.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        id={id}
      />
  );
};

export default Passinput;
