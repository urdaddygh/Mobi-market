import React from "react";
import s from "./ModalForAddProduct.module.css";
import { Modal } from "../modal/Modal";
import Input from "../input/Input";
import { cross_icon } from "../../Images";
import { useFormik } from "formik";
import Button from "../button/Button";

const ModalForAddProduct = ({ active, setActive, closeModal }) => {
  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      image:'',
      price: "",
      name: "",
      short_description: "",
      full_description: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Modal active={active} setActive={setActive} width="564px" height="65%">
      <div className={s.cross_icon} onClick={closeModal}>
        <img src={cross_icon} alt="" />
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          accept="image/png, .svg"
          type="file"
          name="image"
          className={s.input_img}
          value={formik.values.image}
          onChange={formik.handleChange}
        />
        <div>
          <input
            type="text"
            className={s.input}
            placeholder="Цена"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Название"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Краткое описание"
            name="short_description"
            onChange={formik.handleChange}
            value={formik.values.short_description}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Полное описание"
            name="full_description"
            onChange={formik.handleChange}
            value={formik.values.full_description}
          />
        </div>

        <button className={s.button}
          disabled={
            !(
              formik.values.name &&
              formik.values.short_description &&
              formik.values.price &&
              formik.values.full_description
            )
          }
          margin="24px 0"
          type="submit"
        >
          Добавить
        </button>
      </form>
    </Modal>
  );
};

export default ModalForAddProduct;
