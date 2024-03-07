import React, { useState } from "react";
import { change_icon, three_dot, trash_delete_icon } from '../../../Images';
import s from './MyProduct.module.css'

function ThreeDotModal({getProductForModal, openDeleteModal, id}) {
    const [threeDotActive, setThreeDotActive] = useState(false)
    const openThreeDot=(e)=>{
        e.stopPropagation();
        setThreeDotActive(true)
      }
  return (
    <>
      {!threeDotActive ? (
        <img
          src={three_dot}
          alt=""
          className={s.three_dot}
          onClick={(e) => openThreeDot(e)}
        />
      ) : (
        <div className={s.three_dot_active}>
          <div className={s.box} onClick={() => getProductForModal(id)}>
            <img src={change_icon} alt="" /> <p>Изменить</p>
          </div>
          <div className={s.box} onClick={(e) => openDeleteModal(id, e)}>
            <img src={trash_delete_icon} alt="" /> <p>Удалить</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ThreeDotModal;
