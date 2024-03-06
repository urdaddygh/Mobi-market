import React, { useEffect, useState } from "react";
import { persone_img } from "../../Images";
import s from "./styles.module.css";
import { Modal } from "../../components/modal/Modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetPassApi } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";

function ModalForMessage({
  secondmodalActive,
  setSecondModalActive,
  allRight,
}) {
  const [count, setCount] = useState(60);
  const [state, setState] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth.user)
  // console.log(user)
  const startTimer =()=>{
    setState(false)
    setCount(60)
  }

  const showErrMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      code: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      let data = {allRight, showErrMessage, values, id:user.user_id}
      dispatch(resetPassApi(data))
    },
  });

  useEffect(() => {
    if(count === 0) return 

    if(count>0 && secondmodalActive)
    setTimeout(function () {
     setCount((prev) => prev - 1);
    }, 1000);
  }, [count, secondmodalActive]);

  return (
    <>
    <ToastContainer/>
      <Modal
        active={secondmodalActive}
        setActive={setSecondModalActive}
        width="565px"
        height="60%"
      >
        <div className={s.modal_phone}>
          <h4 className={s.number}>Сброс пароля</h4>
          <img src={persone_img} alt="" />
          <h6 className={s.text}>Введите код из СМС</h6>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="number"
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
                  {state && (
                    <p style={{ color: "red", marginTop: "16px" }}>
                      Неверный код
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className={s.sms}>Повторный запрос</p>
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
                    {state && <p style={{ color: "red",marginTop: "16px" }}>Неверный код</p>}
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
