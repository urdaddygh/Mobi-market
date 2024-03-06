import React, { useEffect } from "react";
import ProfilePage from "./profilePage/ProfilePage";
import { Route, Routes } from "react-router-dom";
import s from "./Profile.module.css";
import LikedProduct from "./likedProduct/LikedProduct";
import MyProduct from "./myProduct/MyProduct";
import { useSelector } from "react-redux";
import { getInfoOfUser } from "../../redux/slices/profileSlice";
import {Navbar} from "../../components/navbar/Navbar"

function Profile() {
  useEffect(()=>{
    getInfoOfUser()
  },[])
  const userInfo = useSelector(state=>state.profile.user)
  
  return (
    <div className={s.cont}>
      
      <Navbar name={userInfo.first_name} username={userInfo.username} className={s.navBar} first_name={userInfo.first_name}/>
      <div className={s.profile}>
      <Routes>
        <Route path="/profilePage" element={<ProfilePage ApiUserInfo={getInfoOfUser}/>} /> 
        <Route path="/liked" element={<LikedProduct />} /> 
        <Route path="/myProducts" element={<MyProduct />} /> 
      </Routes>
      </div>
    </div>
  );
}

export default Profile;