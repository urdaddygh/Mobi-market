import React, { useState } from "react";
import s from "./styles.module.css";
import { phone_img } from "../../Images";
import { Modal } from "../../components/modal/Modal";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { forgotPassword } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

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

function ModalForPhone({ modalActive, setModalActive, onClick }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      phone: "",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      let data = { values, onClick };
      dispatch(forgotPassword(data));
      console.log(values);
    },
  });

  // const [phone1, setPhone] = useState("");
  // const handleInput = ({ target: { value } }) => setPhone(value);
  return (
    <>
      <Modal active={modalActive} setActive={setModalActive} width="565px">
        <div className={s.modal_phone}>
          <h4 className={s.number}>Введите номер телефона</h4>
          <img src={phone_img} alt="" />
          <h6 className={s.text}>Введите номер телефона</h6>
          <p className={s.sms}>
            Мы отправим вам СМС с кодом
            <br /> подтверждения
          </p>
          <form onSubmit={formik.handleSubmit}>
            <PhoneInput
              value={formik.values.phone}
              onChange={formik.handleChange}
              alwaysShowMask={false}
              name="phone"
            ></PhoneInput>

            <div>
              <button
                className={s.modal_btn}
                type="submit"
                disabled={!formik.values.phone}
              >
                Далее
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ModalForPhone;
