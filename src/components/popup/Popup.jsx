import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./styles.module.css"


function Popup({text,}) {
  const showToastMessage = () => {
    toast.error({text}, {
      position: toast.POSITION.TOP_CENTER,
      className: s.popup,
    });
  };

  return <ToastContainer />;
}

export default Popup;
