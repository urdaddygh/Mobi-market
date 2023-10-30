import React from "react";
import { liked_icon, logout_icon, products_icon, profile_icon, vector_icon } from "../../Images";
import s from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { removeCookie } from "../../utils/cookieFunction/cookieFunction";

function NavBar({ name, username }) {

    const location = useLocation();
    const linkActiveClassName = (navLink) => {
      const currentParentPath = location.pathname.split("/")[2];
      const isParentLinkActive = currentParentPath === navLink;

      if (isParentLinkActive) return s.active_link;
      return s.link_cont;
    };
    const removeRole=()=>{
      // localStorage.removeItem('role')
      removeCookie("access")
      removeCookie("refresh")
    }
  return (
    <div className={s.content}>
      <div className={s.cont}>
        <div className={s.cont_profile}>
          <img src={profile_icon} alt="" />
        </div>

        <span>
          <h6>{name}</h6>
          <p>{username}</p>
        </span>
      </div>
      <div className={s.navbar}>
        <NavLink to="/profile/liked" className={linkActiveClassName("main")}>
          <img src={liked_icon} alt="" />
          <span>Понравившиеся</span>
          <img src={vector_icon} alt="" className={s.vector}/>
        </NavLink>
        <NavLink to="/profile/myProducts" className={linkActiveClassName("main")}>
          <img src={products_icon} alt="" />
          <span>Мои товары</span>
          <img src={vector_icon} alt="" className={s.vector}/>
        </NavLink>
        <NavLink to="/main" className={s.link_cont} style={{marginTop:"44px"}}>
          <img src={logout_icon} alt="" />
          <span>Выйти</span>
          <img src={vector_icon} alt="" className={s.vector}/>
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
