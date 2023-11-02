import React, { useState } from "react";
import s from "./Profile.module.css";
import NavBar from "../../../components/navbar/NavBar";
import BackToPrevBtn from "../../../components/backToPrevBtn/BackToPrevBtn";
import { profile_icon } from "../../../Images";
import { useFormik } from "formik";
import Button from "../../../components/button/Button";
import ModalForPhone from "./ModalForPhone";
import ModalForMessage from "./ModalForMessage";

function ProfilePage() {
  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);

  const changeActive = () => {
    setSecondModalActive(true);
    setModalActive(false);
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      surname: "",
      name: "",
      username: "",
      birthday: "",
      number: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <BackToPrevBtn to="/main" left="132px" />
      <h2 className={s.h2}>Профиль</h2>
      <div className={s.profile_icon}>
        <img src={profile_icon} alt="" width="31.5" height="40.5" />
      </div>
      <p className={s.p}>Выбрать фотографию</p>
      <form action="">
        <div className={s.cont_input}>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={s.input}
            placeholder="Имя"
          />
          <input
            type="text"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            className={s.input}
            placeholder="Фамилия"
          />
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            className={s.input}
            placeholder="Имя пользователя"
          />
          <input
            type="text"
            name="birthday"
            value={formik.values.birthday}
            onChange={formik.handleChange}
            className={s.input}
            placeholder="Дата рождения"
          />
        </div>
        <div className={s.add_number} onClick={() => setModalActive(true)}>
          <p>Добавить номер</p>
          <input
            type="number"
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            className={s.input_number}
            placeholder="0(000) 000 000"
          />
        </div>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Почта"
        />
        <Button text="Закончить регистрацию" margin="44px auto 0 auto" />
      </form>
      <ModalForPhone
        modalActive={modalActive}
        setModalActive={setModalActive}
        onClick={changeActive}
      />
      <ModalForMessage
        secondmodalActive={secondModalActive}
        setSecondModalActive={setSecondModalActive}
      />
    </>
  );
}

export default ProfilePage;
