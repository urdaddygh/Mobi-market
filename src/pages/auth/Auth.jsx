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
import { postAuth } from "../../redux/slices/authSlice";
import { Modal } from "../../components/modal/Modal";
import InputMask from "react-input-mask";
import ModalForPhone from "./ModalForPhone";
import ModalForMessage from "./ModalForMessage";
import ModalForPassword from "./ModalForPassword";

// function PhoneInput(props) {
//   return (
//     <InputMask
//       mask="0\(000) 000 000"
//       value={props.value}
//       onChange={props.onChange}
//       alwaysShowMask={false}
//     ></InputMask>
//   );
// }

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
  console.log(authErr);

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
      let data = { values, navigate };
      dispatch(postAuth(data));
      console.log(values);
      if (authErr) {
        showToErrMessage("Неверный логин или пароль");
      }
    },
  });

  // const [phone1, setPhone] = useState("");
  // const handleInput = ({ target: { value } }) => setPhone(value);

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
            color={authErr && "red"}
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
              color={authErr && "red"}
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
        {/* <Modal active={modalActive} setActive={setModalActive} width="565px">
          <div className={s.modal_phone}>
          <h4 className={s.number}>Введите номер телефона</h4>
          <img src={phone} alt="" />
          <h6 className={s.text}>Введите номер телефона</h6>
          <p className={s.sms}>
            Мы отправим вам СМС с кодом
            <br /> подтверждения
          </p>
          <PhoneInput
            value={phone1}
            onChange={handleInput}
            alwaysShowMask={false}
          ></PhoneInput>

          <div>
            <button className={s.modal_btn}>Далее</button>
          </div>
          </div>
        </Modal> */}
        
        <NavLink to="/register/email">Зарегистрироваться</NavLink>
      </section>
    </div>
  );
}

export default Auth;
