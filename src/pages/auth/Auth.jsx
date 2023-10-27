import React, { useState } from "react";
import s from "./styles.module.css";
import { backround, close_eye_auth, open_eye_auth } from "../../Images";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

function Auth() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showToErrMessage = (text) => {
    toast.error(text, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const toggle = () => {
    setState(!state);
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, "").max(50, ""),
    password: Yup.string().email(""),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      //   let data = { values, navigate };
      // dispatch(registerEmail(false));
      // localStorage.setItem("email", JSON.stringify(values));
      // console.log(values);
      // navigate("/register/password");
    },
  });

  return (
    <div className={s.cont}>
      <img src={backround} alt="backround" />
      <section className={s.second_section}>
        <form onSubmit={formik.handleSubmit}>
          <ToastContainer />
          <Input
            forLabel="username"
            id="username"
            valueLabel="Имя пользователя"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <div className={s.cont_pass}>
            <Input
              forLabel="password"
              id="password"
              valueLabel="Пароль"
              type={state ?"text":"password"}
              value={formik.values.email}
              onChange={formik.handleChange}
              margin="47px 0 0px 0px"
            />
            {state ? (
              <img src={open_eye_auth} alt="" onClick={toggle} />
            ) : (
              <img src={close_eye_auth} alt="" onClick={toggle} />
            )}
          </div>
          <p>Забыли пароль</p>
          <Button
            text="Войти"
            disabled={!(formik.values.password && formik.values.username)}
            type="submit"
            margin="46px 0 0 0"
          />
        </form>
        <NavLink to="/register/email">
          <h3>Зарегистрироваться</h3>
        </NavLink>
      </section>
    </div>
  );
}

export default Auth;
