import React, { useEffect, useRef, useState } from "react";
import s from "./Profile.module.css";
import BackToPrevBtn from "../../../components/backToPrevBtn/BackToPrevBtn";
import { Icon_for_add_img, profile_icon } from "../../../Images";
import { useFormik } from "formik";
import Button from "../../../components/button/Button";
import ModalForPhone from "./ModalForPhone";
import ModalForMessage from "./ModalForMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoOfUser,
  updateUserInfo,
} from "../../../redux/slices/profileSlice";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

function ProfilePage({ApiUserInfo}) {
  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);
  const [state, setState] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoOfUser());
  }, []);

  const userInfo = useSelector((state) => state.profile.user);
  const fileInputRef = useRef(null);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2)
      .required("Имя пользователя не должно быть пустым")
      .max(50)
      .matches(/(?=.*[a-z])\w+/),
    email: Yup.string().email().required("Почта не должно быть пустым"),
    birth_date: Yup.string()
      // .matches(
      //   /(((19\d{2}|20[0-9]{2}))(\/|\.|\-)(0?[1-9]|1[0-9]|2[0-9]|3[0-1])(\/|\.|\-))(0[0-9]$|1[0-2]$|[0-9]$)/
      // )
      .required("Дата рождения не должно быть пустым"),
    first_name: Yup.string().required("Имя не должно быть пустым"),
    last_name: Yup.string().required("Фамилие не должно быть пустым"),
  });

  const changeActive = () => {
    // time = 60
    setSecondModalActive(true);
    setModalActive(false);
  };

  const showToErrMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SignupSchema,
    enableReinitialize: true,
    initialValues: {
      last_name: userInfo.last_name,
      first_name: userInfo.first_name,
      username: userInfo.username,
      birth_date: userInfo.birth_date,
      email: userInfo.email,
      phone: userInfo.phone,
      photo: userInfo.photo
    },
    onSubmit: (values) => {
      if(typeof values.photo==="string" || values.photo===null){
        delete values.photo
      }
      console.log(values);
      let formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      for (let property of formData.entries()) {
        console.log(property[0], property[1]);
      }
      let data = {
        formData,
        showToErrMessage,
        showSuccessMessage,
        setState
      };
      dispatch(updateUserInfo(data));
      ApiUserInfo()
    },
  });

  useEffect(() => {
    dispatch(getInfoOfUser());
  }, [userInfo.email]);

  useEffect(() => {
    if (formik.errors.birth_date)
      showToErrMessage("Неправильный формат даты, Пример:[год-месяц-день]");
    else if (formik.errors.email) showToErrMessage(formik.errors.email);
    else if (formik.errors.first_name)
      showToErrMessage(formik.errors.first_name);
    else if (formik.errors.last_name) showToErrMessage(formik.errors.last_name);
    else if (formik.errors.username) showToErrMessage(formik.errors.username);
  }, [formik.errors]);

  return (
    <>
      <ToastContainer />
      <BackToPrevBtn to="/main" left="132px" />
      {userInfo.email &&
        userInfo.birth_date &&
        userInfo.first_name &&
        userInfo.last_name &&
        userInfo.username &&
        !state && (
          <div className={s.ready} onClick={() => setState(true)}>
            Изм.
          </div>
        )}

      <h2 className={s.h2}>Профиль</h2>
      <div className={s.profile_icon} onClick={() => fileInputRef.current.click()}>
      {formik.values.photo ? (
        <img
          src={typeof formik.values.photo === 'string' ? userInfo.photo : URL.createObjectURL(formik.values.photo)}
          alt="Selected Image"
          className={s.new_avatar}
        />
      ) : (
        <img src={Icon_for_add_img} alt="" width="31.5" height="40.5" />
      )}
      <input
        accept="image/png, jpg"
        type="file"
        name="photo"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(event) => {
          formik.setFieldValue("photo", event.target.files[0]);
        }}
      />
    </div>
      <p className={s.p}>Выбрать фотографию</p>

      <div className={s.cont_input}>
        <input
          type="text"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Имя"
          // readOnly={
          //   !state
          // }
        />
        <input
          type="text"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Фамилия"
          // readOnly={
          //   !state
          // }
        />
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Имя пользователя"
          // readOnly={
          //   !state
          // }
        />
        <input
          type="text"
          name="birth_date"
          value={formik.values.birth_date}
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Дата рождения"
          // readOnly={
          //   !state
          // }
        />
      </div>
      <div className={s.add_number} onClick={() => setModalActive(true)}>
        <p>Добавить номер</p>
        <input
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className={s.input_number}
          placeholder="0(000) 000 000"
          readOnly
        />
      </div>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        className={s.input}
        placeholder="Почта"
        readOnly={!state}
      />
      {!(
        userInfo.email &&
        userInfo.birth_date &&
        userInfo.first_name &&
        userInfo.last_name &&
        userInfo.username
      ) || state ? (
        <Button
          text="Закончить регистрацию"
          margin="44px auto 0 auto"
          type="button"
          onClick={() => formik.handleSubmit()}
        />
      ) : (
        <></>
      )}

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
