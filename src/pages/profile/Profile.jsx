import React from "react";
import ProfilePage from "./profilePage/ProfilePage";
import { Route, Routes } from "react-router-dom";
import s from "./Profile.module.css";
import NavBar from "../../components/navbar/NavBar";
import LikedProduct from "./likedProduct/LikedProduct";

function Profile() {
  return (
    <div className={s.cont}>
      <NavBar name="dsadsa" username="dsadsa" className={s.navBar} />
      <div className={s.profile}>
      <Routes>
        <Route path="/profilePage" element={<ProfilePage />} /> 
        <Route path="/liked" element={<LikedProduct />} /> 
      </Routes>
      </div>
    </div>
  );
}

export default Profile;
