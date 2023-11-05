import React from "react";
import { Modal } from "../modal/Modal";
import { cross_icon, heart_icon, red_heart_icon } from "../../Images";
import s from "./ModalForProduct.module.css";

const ModalForProduct = ({
  active,
  setActive,
  image,
  price,
  phone_number,
  like_count,
  liked_by_current_user,
  id,
  short_description,
  name,
  likeProductById,
  full_description,
  closeModal,
  deleteModalActive
}) => {
  return (
    <Modal active={active} setActive={setActive} width="564px" height="90%">
      <div className={s.cross_icon} onClick={closeModal}>
        <img src={cross_icon} alt="" />
      </div>
      <img src={image} alt="" width="532px" height="320px" />
      <div className={s.cont}>
        <h4>{price} сом</h4>
        <span>{phone_number}</span>
        <div className={s.heart_icon}>
          <img
            src={liked_by_current_user ? red_heart_icon : heart_icon}
            alt=""
            onClick={
              liked_by_current_user
                ? () => deleteModalActive(true)
                : (e) => likeProductById(id, e)
            }
            className={s.heart}
          />
          <span>Нравится: {like_count}</span>
        </div>
        <h3>{name}</h3>
        <p>{short_description}</p>
        <h5>Детальное описание</h5>
        <p>{full_description}</p>
      </div>
    </Modal>
  );
};

export default ModalForProduct;
