import React from "react";
import s from "./ModalForAddProduct.module.css";
import { Modal } from "../modal/Modal";
import Input from "../input/Input";
import { cross_icon } from "../../Images";
import { FieldArray, useFormik } from "formik";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/productsApiSlice";
import * as yup from 'yup'

const ModalForAddProduct = ({ active, setActive, closeModal }) => {

  const dispatch = useDispatch()

  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const validationSchema = yup.object().shape({
    image: yup.array().of(yup.object().shape({
      file: yup.mixed().test('fileSize', 'Размер файла больше 10 байт', (value) => {
        if (!value) return false
        return value.size < 10
      }).required(),
      type: yup.string().oneOf([`application/vnd.ms-publisher`], 'Добавьте файл с правильным форматов').required(),
      name: yup.string().required()
    }).typeError('Добавьте файл')).required()
  })

  const formik = useFormik({
    // validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      image:undefined,
      price: "",
      name: "",
      short_description: "",
      full_description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        /* Then create a new FormData obj */
        let formData = new FormData();
        /* FormData requires name: id */
        formData.append("image", values.image);
        /* append input field values to formData */
        // for (let value in values) {
        //   formData.append(value, values[value]);
        // }
        // /* Can't console.log(formData), must
        //    use formData.entries() - example:  */
        // for (let property of formData.entries()) {
        //   console.log(property[0], property[1],"property");
        // }

      console.log(formData)
      console.log(values)
      let data ={values, showSuccessMessage}
      dispatch(addProduct(data))
    },
  });
  const getFileSchema = (file) => (file && {
    file: file,
    type: file.type,
    name: file.name
  })
  return (
    <Modal active={active} setActive={setActive} width="564px" height="65%">
      <div className={s.cross_icon} onClick={closeModal}>
        <img src={cross_icon} alt="" />
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
       <FieldArray name="image" validateOnChange={false}>
        {(arrayHelper)=>(
          <input
            accept="image/png, .svg"
            type="file"
            name="image"
            className={s.input_img}
            value={formik.values.image}
            onChange={(event) => {
              const { images } = event.target
              const image = getFileSchema(images(0))
              if (!image) {
                arrayHelper.remove(0)
              }
              if (Array.isArray(formik.values.image)) {
                arrayHelper.replace(0, image)
              } else {
                arrayHelper.push(image)
              }
            }}
          />
        )}
        </FieldArray>
        <div>
          <input
            type="text"
            className={s.input}
            placeholder="Цена"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Название"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Краткое описание"
            name="short_description"
            onChange={formik.handleChange}
            value={formik.values.short_description}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Полное описание"
            name="full_description"
            onChange={formik.handleChange}
            value={formik.values.full_description}
          />
        </div>

        <button
          className={s.button}
          disabled={
            !(
              formik.values.name &&
              formik.values.short_description &&
              formik.values.price &&
              formik.values.full_description
            )
          }
          margin="24px 0"
          type="submit"
        >
          Добавить
        </button>
      </form>
    </Modal>
  );
};

export default ModalForAddProduct;
