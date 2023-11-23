import React, { useEffect, useState } from "react";
import s from "./Profile.module.css";
import { phone_img } from "../../../Images";
import { Modal } from "../../../components/modal/Modal";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { forgotPassword, sendCodeApi } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function PhoneInput({ value, onChange, name, className, placeholder, type }) {
  return (
    <InputMask
      mask="0\(999\) 999 999"
      maskChar="_"
      value={value}
      onChange={onChange}
      name={name}
      alwaysShowMask={true}
      className={className}
      placeholder={placeholder}
      type={type}
    ></InputMask>
  );
}

function ModalForPhone({ modalActive, setModalActive, onClick }) {
  const dispatch = useDispatch();
  const [err,setErr]= useState(false)
  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      phone: "",
    },
    onSubmit: (values) => {
      let data = { values, onClick, setErr };
      dispatch(sendCodeApi(data));
      console.log(values);
    },
  });
  useEffect(()=>{
    setErr(false)
  },[formik.values.phone])
  return (
    <>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        width="565px"
        height="70%"
      >
        <div className={s.modal_phone}>
          <h4 className={s.number}>Введите номер телефона</h4>
          <img src={phone_img} alt="" className={s.phone_icon} />
          <h6 className={s.text}>Введите номер телефона</h6>
          <p className={s.sms}>
            Мы отправим вам СМС с кодом
            <br /> подтверждения
          </p>
          <form onSubmit={formik.handleSubmit}>
            <PhoneInput
              value={formik.values.phone}
              onChange={formik.handleChange}
              name="phone"
              className={s.mask}
              // type="number"
            ></PhoneInput>
            <p className={s.err}>{err&&"Данный номер уже зарегистрирован"}</p>
            <button
              className={s.modal_btn}
              type="submit"
              disabled={!formik.values.phone||err}
            >
              Далее
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ModalForPhone;
