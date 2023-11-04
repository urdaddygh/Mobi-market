import React from "react";
import ProfilePage from "./profilePage/ProfilePage";
import { Route, Routes } from "react-router-dom";
import s from "./Profile.module.css";
import NavBar from "../../components/navbar/NavBar";
import LikedProduct from "./likedProduct/LikedProduct";
import MyProduct from "./myProduct/MyProduct";
import { useSelector } from "react-redux";

function Profile() {

  const userInfo = useSelector(state=>state.auth.user)

  return (
    <div className={s.cont}>
      <NavBar name={userInfo.name} username={userInfo.username} className={s.navBar} />
      <div className={s.profile}>
      <Routes>
        <Route path="/profilePage" element={<ProfilePage />} /> 
        <Route path="/liked" element={<LikedProduct />} /> 
        <Route path="/myProducts" element={<MyProduct />} /> 
      </Routes>
      </div>
    </div>
  );
}

export default Profile;
