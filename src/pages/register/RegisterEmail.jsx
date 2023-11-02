import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import s from "./styles.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { registerEmail } from "../../redux/slices/registerSlice";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToPrevBtn from "../../components/backToPrevBtn/BackToPrevBtn";

function RegisterEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showToastMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2).max(50).matches(/(?=.*[a-z])\w+/),
    email: Yup.string().email(),
  });

 

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      // console.log(formik.errors.email);
      // let data = { values, navigate };
      console.log(formik.errors.email,"dsa");
      if (formik.errors.email) {
        showToastMessage();
      } else {
        console.log(formik.errors);
        dispatch(registerEmail(false));
        localStorage.setItem("email", JSON.stringify(values));
        navigate("/register/password");
      }
    },
  });

  useEffect(() => {
    if (formik.errors.email) showToastMessage("Неверная почта");
    else if (formik.errors.username) showToastMessage("Неверное имя пользователя");
  }, [formik.errors]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <BackToPrevBtn to="/" />
      <ToastContainer />
      <Input
        forLabel="username"
        id="username"
        valueLabel="Имя пользователя"
        type="text"
        value={formik.values.username}
        onChange={formik.handleChange}
        color={formik.errors.username ? "red" : ""}
      />
      {/* {formik.errors.email&&showToastMessage()} */}
      <Input
        forLabel="email"
        id="email"
        valueLabel="Почта"
        type="text"
        value={formik.values.email}
        onChange={formik.handleChange}
        margin="47px 0 0 0"
        color={formik.errors.email ? "red": ""}
      />
      <Button
        text="Далее"
        disabled={!(formik.values.email && formik.values.username)}
        type="submit"
        margin="79px 0 0 0"
      />
    </form>
  );
}

export default RegisterEmail;
