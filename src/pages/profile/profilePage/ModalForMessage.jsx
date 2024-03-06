import React, { useEffect, useState } from "react";
import { persone_img } from "../../../Images";
import s from "./Profile.module.css";
import { Modal } from "../../../components/modal/Modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { verifyPhoneApi } from "../../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { getInfoOfUser } from "../../../redux/slices/profileSlice";

function ModalForMessage({
  secondmodalActive,
  setSecondModalActive,
}) {
  const [count, setCount] = useState(60);
  const [state, setState] = useState(false);
  const err = useSelector(state=>state.auth.error)
  // console.log(count)
  const dispatch = useDispatch()

  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  const startTimer =()=>{
    setState(false)
    setCount(60)
  }
  useEffect(() => {
    if(count === 0) return 

    if(count>0 && secondmodalActive)
    setTimeout(function () {
     setCount((prev) => prev - 1);
    }, 1000);
  }, [count, secondmodalActive]);
  
  // console.log(count)

  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      code: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      let data={values, showSuccessMessage, setState, setSecondModalActive}
      dispatch(verifyPhoneApi(data))
      dispatch(getInfoOfUser())
    },
  });
  return (
    <>
    <ToastContainer />
      <Modal
        active={secondmodalActive}
        setActive={setSecondModalActive}
        width="565px"
        height="60%"
      >
        <div className={s.modal_phone}>
          <h4 className={s.number}>Изменить номер телефона</h4>
          <img src={persone_img} alt="" className={s.phone_icon} />
          <h6 className={s.text}>Введите код из СМС</h6>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              value={formik.values.code}
              name="code"
              id="code"
              placeholder="0000"
              onChange={formik.handleChange}
              className={s.input_message}
            />
            <div>
              {count <= 0 ? (
                <>
                  <p className={s.repeat_code} onClick={startTimer}>Отправить код еще раз</p>
                  {err && (
                    <p className={s.wrong_code}>
                      Неверный код
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className={s.sms} >Повторный запрос</p>
                  <div className={s.prloader_cont}>
                    {/* <Preloader
                      use={Oval}
                      size={16}
                      strokeWidth={8}
                      strokeColor="#494949"
                      duration={2000}
                    /> */}
                    <p>00:{count}</p>
                  </div>
                  {err && (
                    <p className={s.wrong_code}>
                      Неверный код
                    </p>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ModalForMessage;
