import React, { useState } from "react";
import {
  exit_icon,
  liked_icon,
  logout_icon,
  products_icon,
  profile_icon,
  vector_icon,
} from "../../Images";
import s from "./NavBar.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookieFunction/cookieFunction";
import { Modal } from "../modal/Modal";
import Button from "../button/Button";

function NavBar({ name, username, className }) {
  const location = useLocation();
  const [active, setActive] = useState(false)
  const navigate = useNavigate()

  const linkActiveClassName = (navLink) => {
    const currentParentPath = location.pathname.split("/")[2];
    const isParentLinkActive = currentParentPath === navLink;

    if (isParentLinkActive) return s.active_link;
    return s.link_cont;
  };
  const openExitModal = ()=>{
    setActive(!active)
  }
  const removeRole = () => {
    removeCookie("access");
    removeCookie("refresh");
    navigate('/')
  };
  return (
    <div className={className}>
      <div className={s.cont}>
        <div className={s.cont_profile} onClick={()=>navigate('/profile/profilePage')}>
          <img src={profile_icon} alt="" />
        </div>

        <span>
          <h6>{name}</h6>
          <p>{username}</p>
        </span>
      </div>
      <div className={s.navbar}>
        <NavLink to="/profile/liked" className={linkActiveClassName("liked")}>
          <img src={liked_icon} alt="" />
          <span>Понравившиеся</span>
          <img src={vector_icon} alt="" className={s.vector} />
        </NavLink>
        <NavLink
          to="/profile/myProducts"
          className={linkActiveClassName("myProducts")}
        >
          <img src={products_icon} alt="" />
          <span>Мои товары</span>
          <img src={vector_icon} alt="" className={s.vector} />
        </NavLink>
        <div className={s.link_cont} onClick={openExitModal} style={{ marginTop: "44px" }}>
          <img src={logout_icon} alt="" />
          <span>Выйти</span>
          <img src={vector_icon} alt="" className={s.vector} />
        </div>
      </div>
      <Modal active={active} setActive={setActive} width="391px" height="50%">
          <img src={exit_icon} alt="" className={s.exit}/>
          <p className={s.p}>Вы действительно хотите выйти<br /> с аккаунта?</p>
          <div>
            <Button text="Выйти" width="280px" margin="24px auto 0 auto" onClick={removeRole}/>
            <button className={s.cancel} onClick={openExitModal}>Отмена</button>
          </div>
      </Modal>
    </div>
  );
}

export default NavBar;
