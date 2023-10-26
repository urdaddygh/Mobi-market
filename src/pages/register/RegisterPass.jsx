import React, { useEffect, useState } from "react";
import Passinput from "../../components/passInput/PassInput";
import s from "./styles.module.css";
import Button from "../../components/button/Button";
import { close_eye, lock, open_eye } from "../../Images";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RegisterPass() {
  const [pass, setPass] = useState(false);
  const [state, setState] = useState(true);
  const [confirm, setConfirm] = useState(false)
  const dispatch = useDispatch();
  const err = useSelector((state) => state.auth.error);
  //   console.log(err);
  function toggleForPass() {
    setPass(!pass);
  }
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },

    onSubmit: (values) => {
        if(values.password===values.confirm_password){
            let email = localStorage.getItem("email");
            email = JSON.parse(email);
            let data = { ...values, ...email };
            console.log(data);
            //   dispatch(postAuth(data));
        }else{
            setConfirm(true)
        }
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (err === false) {
      navigate("/register/email");
    }
  }, []);

  const toggle = () => {
    setState(!state);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {state ? (
        <img src={close_eye} alt="" className={s.eye} onClick={toggle} />
      ) : (
        <img src={open_eye} alt="" className={s.eye} onClick={toggle} />
      )}
      <div className={s.cont_pass}>
        <div className={s.icon_lock}>
          <img src={lock} alt="" />
        </div>
        <h5>Придумайте пароль</h5>
        <p>
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
          color={confirm&&"red"}
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
              color={confirm&&"red"}
            />
            {confirm&&<span style={{color:"red", fontSize:"15px", marginTop:"8px"}}>Пароли не совпадают</span>}
            <Button text="Готово" margin="46px 0 0 0 " type="submit" />
          </>
        ) : (
          <Button text="Далее" margin="86px 0 0 0 " onClick={toggleForPass} />
        )}
      </div>
    </form>
  );
}

export default RegisterPass;
