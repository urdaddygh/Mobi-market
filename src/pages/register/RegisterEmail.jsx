import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import s from "./styles.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { checkUserApi, registerEmail } from "../../redux/slices/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToPrevBtn from "../../components/backToPrevBtn/BackToPrevBtn";

function RegisterEmail() {
  const [state, setState] = useState(false) 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRegister = useSelector(state=>state.register.isRegister)
  console.log(isRegister)
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
      let data = { values, navigate, showToastMessage,  };
      console.log(data);
      dispatch(checkUserApi(data));
      // if(isRegister.email) {
      //   showToastMessage("Данная почта уже зарегистрирована")
      // }
      // if(isRegister.username){
      //   showToastMessage("Данное имя пользователя уже занято")
      // }
        // localStorage.setItem("email", JSON.stringify(values));
        // navigate("/register/password");
    },
  });

  const disableBtn = ()=>{
    if(!formik.values.email && !formik.values.username) return true
    else if(formik.errors) return true
    
    return false
  }

  useEffect(() => {
    if (formik.errors.email && formik.errors.username ) showToastMessage("Неккоректное имя пользователя и почта");
    else if (formik.errors.email) showToastMessage("Некорректная почта");
    else if (formik.errors.username) showToastMessage("Имя пользователя должно содержать от 2 до 8 символов");
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
        color={formik.errors.username || isRegister.username ? "red" : ''}
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
        color={formik.errors.email || isRegister.email ? "red": ""}
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
