import React, { useEffect, useState } from "react";
import { persone_img } from "../../../Images";
import s from "./Profile.module.css";
import { Modal } from "../../../components/modal/Modal";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { Preloader, Oval } from "react-preloader-icon";

function PhoneInput(props) {
  return (
    <InputMask
      mask=""
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      alwaysShowMask={false}
    ></InputMask>
  );
}

function ModalForMessage({
  secondmodalActive,
  setSecondModalActive,
  allRight,
}) {
  const [count, setCount] = useState(60);
  const [state, setState] = useState(false);
  const [timer, setTimer] = useState(false);
  console.log(timer)
  useEffect(() => {
    setInterval(function () {
      setCount((prev) => prev - 1);
    }, 1000);
  }, [timer]);

  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      message: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values.message);
      if (values.message === "1991") {
        setState(false);
        allRight();
      } else {
        setState(true);
      }
      //   let data = { values, navigate };
      //   dispatch(postAuth(data));
      //   console.log(values);
    },
  });
  return (
    <>
      <Modal
        active={secondmodalActive}
        setActive={setSecondModalActive}
        width="565px"
        height="70%"
      >
        <div className={s.modal_phone}>
          <h4 className={s.number}>Сброс пароля</h4>
          <img src={persone_img} alt="" className={s.phone_icon} />
          <h6 className={s.text}>Введите код из СМС</h6>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              value={formik.values.message}
              name="message"
              id="message"
              placeholder="0000"
              onChange={formik.handleChange}
              className={s.input_message}
            />
            <div>
              {count <= 0 ? (
                <>
                  <p className={s.repeat_code} onClick={()=>setTimer(!timer)}>Отправить код еще раз</p>
                  {state && (
                    <p style={{ color: "red", marginTop: "16px" }}>
                      Неверный код
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className={s.sms} >Повторный запрос</p>
                  <div className={s.prloader_cont}>
                    <Preloader
                      use={Oval}
                      size={16}
                      strokeWidth={8}
                      strokeColor="#494949"
                      duration={2000}
                    />
                    <p>00:{count}</p>
                  </div>
                  {state && (
                    <p style={{ color: "red", marginTop: "16px" }}>
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
