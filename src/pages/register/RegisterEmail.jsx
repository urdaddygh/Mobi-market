import { useFormik } from "formik";
import React from "react";
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

  const showToastMessage = () => {
    toast.error("Неверный логин или почта", {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, "").max(50, ""),
    email: Yup.string().email(""),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      //   let data = { values, navigate };
      dispatch(registerEmail(false));
      localStorage.setItem("email", JSON.stringify(values));
      console.log(values);
      navigate("/register/password");
    },
  });

  formik.errors.email && formik.touched.email && showToastMessage();

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
      />

      <Input
        forLabel="email"
        id="email"
        valueLabel="Почта"
        type="text"
        value={formik.values.email}
        onChange={formik.handleChange}
        margin="47px 0 0 0"
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
