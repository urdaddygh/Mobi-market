import React from "react";
import s from "./Input.module.scss";

const TextArea = ({ placeholder, value, valueLabel, onChange, name }) => {
  return (
    <div className={s.input_container}>
      <label className={s.label}>{valueLabel}</label>
      <textarea
        rows="10"
        cols="45"
        className={s.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default TextArea;
