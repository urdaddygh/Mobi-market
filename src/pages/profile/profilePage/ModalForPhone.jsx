import React, { useState } from "react";
import s from "./Profile.module.css";
import { phone_img } from "../../../Images";
import { Modal } from "../../../components/modal/Modal";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { forgotPassword } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function PhoneInput({value,onChange,name,className, placeholder, type}) {
  return (
    <InputMask
      mask="0(000) 000 000"
      value={value}
      onChange={onChange}
      name={name}
      alwaysShowMask={true}
      className={className}
      placeholder={placeholder}
      type={type}
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
      <Modal active={modalActive} setActive={setModalActive} width="565px" height="80%">
        <div className={s.modal_phone}>
          <h4 className={s.number}>Введите номер телефона</h4>
          <img src={phone_img} alt="" className={s.phone_icon}/>
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
              className={s.mask}
              // type="number"
            ></PhoneInput>

        
              <button
                className={s.modal_btn}
                type="submit"
                disabled={!formik.values.phone}
              >
                Далее
              </button>
  
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ModalForPhone;
