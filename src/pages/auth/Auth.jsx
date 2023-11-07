import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import { backround, close_eye_auth, open_eye_auth, phone } from "../../Images";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { changeErr, postAuth } from "../../redux/slices/authSlice";
import ModalForPhone from "./ModalForPhone";
import ModalForMessage from "./ModalForMessage";
import ModalForPassword from "./ModalForPassword";

function Auth() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authErr = useSelector((state) => state.auth.error);
  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);
  const [thirdModalActive, setThirdModalActive] = useState(false);

  const changeActive =()=>{
    setSecondModalActive(true)
    setModalActive(false)
  }
  const changeActiveToPassword =()=>{
    setThirdModalActive(true)
    setSecondModalActive(false)
  }
  // console.log(authErr,"current");

  const showToErrMessage = (text) => {
    toast.error(text, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
      toastId:"popup"
    });
  };
  const toggle = () => {
    setState(!state);
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, "").max(50, ""),
  });
 
  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      let data = { values, navigate, showToErrMessage };
      dispatch(postAuth(data));
    },
  });

    if(formik.values.username===""){

      dispatch(changeErr(false))
    }
    if(formik.values.password===""){
      dispatch(changeErr(false))
    }
    
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
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            color={authErr && formik.values.username!=="" && "red"}
          />
          <div className={s.cont_pass}>
            <Input
              forLabel="password"
              id="password"
              name="password"
              valueLabel="Пароль"
              type={state ? "text" : "password"}
              value={formik.values.email}
              onChange={formik.handleChange}
              margin="47px 0 0px 0px"
              color={authErr&&formik.values.password!=="" && "red"}
            />
            {state ? (
              <img src={open_eye_auth} alt="" onClick={toggle} className={s.eye_auth}/>
            ) : (
              <img src={close_eye_auth} alt="" onClick={toggle} className={s.eye_auth}/>
            )}
          </div>
          <p onClick={() => setModalActive(true)} className={s.forgot}>
            Забыли пароль
          </p>
          <Button
            text="Войти"
            disabled={!(formik.values.password && formik.values.username)}
            type="submit"
            margin="46px 0 0 0"
          />
        </form>
        <ModalForPhone modalActive={modalActive} setModalActive={setModalActive} onClick={changeActive}/>
        <ModalForMessage secondmodalActive={secondModalActive} setSecondModalActive={setSecondModalActive} allRight={changeActiveToPassword}/>
        <ModalForPassword modalActive={thirdModalActive} setModalActive={setThirdModalActive} />
        <NavLink to="/register/email">Зарегистрироваться</NavLink>
      </section>
    </div>
  );
}

export default Auth;
