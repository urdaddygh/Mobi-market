import React from "react";
import s from "./ModalForAddProduct.module.css";
import { Modal } from "../modal/Modal";
import Input from "../input/Input";
import { cross_icon } from "../../Images";
import { useFormik } from "formik";

const ModalForAddProduct = ({ active, setActive, closeModal }) => {
  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      message: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Modal active={active} setActive={setActive} width="564px" height="60%">
      <div className={s.cross_icon} onClick={closeModal}>
        <img src={cross_icon} alt="" />
      </div>
      <input accept="image/png, .svg" type="file" name="image" className={s.input}/>
    </Modal>
  );
};

export default ModalForAddProduct;
