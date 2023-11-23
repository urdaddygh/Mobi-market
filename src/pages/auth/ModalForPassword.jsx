import React, { useEffect, useState } from "react";
import Passinput from "../../components/passInput/PassInput";
import s from "./styles.module.css";
import Button from "../../components/button/Button";
import { close_eye, lock, open_eye } from "../../Images";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "../../components/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { changePassword } from "../../redux/slices/authSlice";

function ModalForPassword({ modalActive, setModalActive }) {
  const [pass, setPass] = useState(false);
  const [state, setState] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const showToErrMessage = (text) => {
    toast.error(text, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const showToSuccessMessage = (text) => {
    toast.success(text, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "")
      .max(50, "")
      .matches(/(?=.*[0-9])(?=.*[A-Z])/),
    // confirm_password: Yup.string().min(8, "").max(50, ""),
  });

  const dispatch = useDispatch();
  //   console.log(err);

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: false,
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (values.password === values.confirm_password) {
          let data = {
            values,
            setModalActive,
            showToSuccessMessage
          };
          console.log(values);
          dispatch(changePassword(data, showToSuccessMessage));
      } else {
        showToErrMessage("Пароли не совпадают");
        setConfirm(true);
      }
    },
  });

  function toggleForPass() {
    setPass(!pass);
  }

  const toggle = () => {
    setState(!state);
  };

  useEffect(()=>{
    if (formik.errors.password || formik.errors.confirm_password)
      showToErrMessage(
        "Пароль должен быть больше 8 символов и содержать 1 заглавную букву и число"
      );
     
  },[formik.errors])

  return (
    <>
      <Modal active={modalActive} setActive={setModalActive} width="565px" height="80%">
        <form onSubmit={formik.handleSubmit}>
          {state ? (
            <img src={close_eye} alt="" className={s.eye_modal} onClick={toggle} />
          ) : (
            <img src={open_eye} alt="" className={s.eye_modal} onClick={toggle} />
          )}
          <div className={s.cont_pass}>
            <h3 className={s.title_one}>Новый пароль</h3>
            <div className={s.icon_lock}>
              <img src={lock} alt="" />
            </div>
            <h5>Придумайте пароль</h5>
            <p className={s.text_two}> 
              Минимальная длина — 8 символов.
              <br /> Для надежности пароль должен
              <br /> содержать буквы и цифры.
            </p>
            <Passinput
              type={state ? "password" : "text"}
              name="password"
              fontSize={state === false && "24px"}
              letteSpacing={state === false && "0px"}
              onChange={formik.handleChange}
              value={formik.values.password}
              color={confirm && "red"}
              margin="28px 0 0 0"
            />
            {pass ? (
              <>
                <Passinput
                  type={state ? "password" : "text"}
                  fontSize={state === false && "24px"}
                  letteSpacing={state === false && "0px"}
                  name="confirm_password"
                  onChange={formik.handleChange}
                  value={formik.values.confirm_password}
                  color={confirm && "red"}
                />
                {confirm && (
                  <span
                    style={{ color: "red", fontSize: "15px", marginTop: "8px" }}
                  >
                    Пароли не совпадают
                  </span>
                )}
                <Button
                  text="Готово"
                  margin="46px 0 0 0 "
                  type="submit"
                  disabled={
                    !(formik.values.password && formik.values.confirm_password)
                  }
                />
              </>
            ) : (
              <Button
                text="Далее"
                margin="86px 0 0 0 "
                onClick={toggleForPass}
                // type="submit"
                disabled={!formik.values.password}
              />
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ModalForPassword;
