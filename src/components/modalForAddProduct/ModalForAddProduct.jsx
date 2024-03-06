import React, { useRef, useState } from "react";
import s from "./ModalForAddProduct.module.css";
import { Modal } from "../modal/Modal";
import { cross_icon } from "../../Images";
import { FieldArray, useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts } from "../../redux/slices/productsApiSlice";
import { useNavigate } from "react-router-dom";

const ModalForAddProduct = ({ active, setActive, closeModal,setActiveSuccess }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const products = useSelector(state=>state.products.products)
  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const showErrMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  const updateProducts = ()=>{
    dispatch(getProducts(products.page))
  }

  const formik = useFormik({
    validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      uploaded_images: null,
      price: "",
      name: "",
      short_description: "",
      full_description: "",
    },
    onSubmit: (values, actions) => {
      let formData = new FormData();
      
      selectedFiles.forEach((file) => {
        // let form = new FormData()
        // form.append("image", file)
        formData.append(`uploaded_images`, file);
      });
      formData.append("price", values.price);
      formData.append("name", values.name);
      formData.append("short_description", values.short_description);
      formData.append("full_description", values.full_description);
      let data = {
        formData,
        showSuccessMessage,
        actions,
        updateProducts,
        setActiveSuccess,
        showErrMessage,
      };

      // for(let [key, value] of formData.entries()){
      //   console.log(key, value)
      // }
      dispatch(addProduct(data));
    },
  });

  const handleFileChange = () => {
    const files = Array.from(fileInputRef.current.files);
    setSelectedFiles([...selectedFiles,...files]);
  };
  const deleteProduct = (product)=>{
    console.log(product)
    setSelectedFiles(selectedFiles.filter(el=>el.name!==product))
  }

  return (
    <Modal active={active} setActive={setActive} width="564px" height="65%">
      <div className={s.cross_icon} onClick={closeModal}>
        <img src={cross_icon} alt="" />
      </div>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className={s.flex}>
        <input
          accept="image/png, jpg"
          type="file"
          name="uploaded_images"
          className={s.input_img}
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
        />
          <div className={s.cont_img}>
            {selectedFiles.map((file, index) => (
            <div className={s.div_img} key={index}>
            <img
              className={s.added_img}
              src={URL.createObjectURL(file)}
              alt={`Изображение ${index + 1}`}
            />
            <div className={s.delete} onClick={()=>deleteProduct(file.name)}></div>
            </div>
          ))}
          </div>
          </div>
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