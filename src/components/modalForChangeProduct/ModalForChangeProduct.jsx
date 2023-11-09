import React, { useRef, useState } from "react";
import { Modal } from "../modal/Modal";
import { cross_icon, heart_icon, red_heart_icon } from "../../Images";
import s from "./ModalForChangeProduct.module.css";
import { useFormik } from "formik";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeProduct, deleteProduct, getMyProducts } from "../../redux/slices/productsApiSlice";
import CarouselSlider from "../carousel/CarouselSlider";
import { CarouselProvider, DotGroup } from "pure-react-carousel";

const ModalForChangeProduct = ({
  active,
  setActive,
  image=[],
  price,
  id,
  short_description,
  name,
  full_description,
  closeModal,
  isChanging,
  setIsChanging,
  myProductsPage
}) => {
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const updateProduct=()=>{
    dispatch(getMyProducts(myProductsPage))
  }

  const changeBtn=(e)=>{
    e.stopPropagation();
    setSelectedFiles([...image])
    setIsChanging(true)
  }

  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };


  const formik = useFormik({
    validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize:true,
    initialValues: {
      uploaded_images:{},
      price: price,
      name: name,
      short_description: short_description,
      full_description: full_description,
    },
    onSubmit: (values) => {
      let formData = new FormData();
      console.log(selectedFiles)
      selectedFiles.forEach((file) => {
        formData.append("image[]", file);
      });
      formData.append("price", values.price);
      formData.append("name", values.name);
      formData.append("short_description", values.short_description);
      formData.append("full_description", values.full_description);
      console.log(formData.getAll('image[]'))
      let data = { values, showSuccessMessage, updateProduct, id };
      dispatch(changeProduct(data))
    },
  });

  const handleFileChange = () => {
    const files = Array.from(fileInputRef.current.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };
  const deleteImg = (product)=>{
    console.log(product)
    setSelectedFiles(selectedFiles.filter(el=>el.name!==product))
  }

  const deleteProductById = ()=>{
    let data = {showSuccessMessage, id, closeModal, updateProduct}
    dispatch(deleteProduct(data))
  }
  return (
    <Modal active={active} setActive={setActive} width="564px" height="90%">
      <div className={s.cross_icon} onClick={closeModal}>
        <img src={cross_icon} alt="" />
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        {!isChanging ? (
          <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={80}
          totalSlides={image?.length}
          step={1}
          isIntrinsicHeight={true}
        >
          <CarouselSlider image={image} />
          <DotGroup className="dot-group" />
        </CarouselProvider>
        ) : (
          <div className={s.flex}>
            <input
              accept="image/png"
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
                    src={file.image}
                    alt={`Изображение ${index + 1}`}
                  />
                  <div
                    className={s.delete}
                    onClick={() => deleteImg(file.name)}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={s.cont}>
          <input
            type="text"
            className={s.input}
            placeholder="Цена"
            name="price"
            value={formik.values.price}
            onChange={handleFileChange}
            readOnly={!isChanging}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Название"
            name="name"
            onChange={formik.handleChange}
            readOnly={!isChanging}
            value={formik.values.name}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Краткое описание"
            name="short_description"
            onChange={formik.handleChange}
            readOnly={!isChanging}
            value={formik.values.short_description}
          />
          <input
            type="text"
            className={s.input}
            placeholder="Полное описание"
            name="full_description"
            onChange={formik.handleChange}
            readOnly={!isChanging}
            value={formik.values.full_description}
          />
        </div>
        <div className={s.cont_btn}>
          {isChanging ? (
            <Button text="Сохранить" width="260px" type="submit" />
          ) : (
            <>
              <button width="260px" onClick={(e) => changeBtn(e)}>
                Редактировать
              </button>
              <span onClick={deleteProductById}>Удалить</span>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ModalForChangeProduct;
