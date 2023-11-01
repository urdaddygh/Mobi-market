import React from "react";
import s from "./Header.module.css";
import { profile_icon, shop_icon } from "../../Images";
import Button from "../button/Button";

function Header({name, username, onClick}) {
  return (
    <header>
      <div className={s.icon}>
        <img src={shop_icon} alt="" />
        <h1>MOBI MARKET</h1>
      </div>
      <div className={s.box}>
        <Button text="Подать объявление" width="215px" onClick={onClick}/>
        <span>
          <h6>{name}</h6>
          <p>{username}</p>
        </span>
        <div className={s.cont_profile}>
          <img src={profile_icon} alt="" />
        </div>       
      </div>
    </header>
  );
}

export default Header;
