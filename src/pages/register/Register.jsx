import React from "react";
import s from "./styles.module.css";
import { Route, Routes } from "react-router-dom";
import RegisterEmail from "./RegisterEmail";
import RegisterPass from "./RegisterPass";
import { backround } from "../../Images";

function Register() {
  return (
    <div className={s.cont}>
      <img src={backround} alt="backround" />
      <section className={s.second_section}>
        <h3>Регистрация</h3>
        <Routes>
          <Route path="/email" element={<RegisterEmail />} />
          <Route path="/password" element={<RegisterPass />} />
        </Routes>
      </section>
    </div>
  );
}

export default Register;
