import React from "react";
import s from "./ModalForCancel.module.css";

export const ModalForCancel = ({ yesClick, noClick,text}) => {
  return (
    <div className={s.modal_cancel}>
      <p>{text}</p>
      <div className={s.cont}>
        <span className={s.yes} onClick={yesClick}>Да</span>
        <span className={s.no} onClick={noClick}>Нет</span>
      </div>
    </div>
  );
};
