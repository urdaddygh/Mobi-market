import React from 'react'
import { Modal } from '../modal/Modal'
import { delete_icon } from '../../Images'
import Button from '../button/Button'
import s from './DeleteModal.module.css'

function DeleteModal({onClick, acitve, setActive, cancelClick}) {
  return (
    <Modal active={acitve} setActive={setActive} height="392px" width="391px">
      <div className={s.cont}>
        <img src={delete_icon} alt="" width="86px" height="108px" className={s.delete_icon}/>
        <p>Вы действительно хотите<br /> удалить данный товар?</p>
        <Button text="Удалить" onClick={onClick} width="280px" margin="0 auto"/>
        <span onClick={cancelClick}>Отмена</span>
      </div>
    </Modal>
  );
}

export default DeleteModal