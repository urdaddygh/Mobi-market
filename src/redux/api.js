import axios from "axios";
import { getCookie } from "../utils/cookieFunction/cookieFunction";

const access = getCookie("access")

const fetchAPI = axios.create({
    baseURL: "https://neobook.online/mobi-market/",
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
    },
});

const fetchNoTokenAPI = axios.create({
    baseURL: "https://neobook.online/mobi-market/",
    headers: {
        "Content-type": "application/json",
    },
});


export const requests = {
    authApi:(data)=>fetchNoTokenAPI.post("users/login/", data),
    getRefreshToken:(data)=>fetchNoTokenAPI.post("users/login/refresh/", data),
    forgotPassword:(data)=>fetchNoTokenAPI.post("users/forgot-password/", data),
    changePassword:(data)=>fetchNoTokenAPI.post("users/change-password/", data),
    sendCodeApi:(data)=>fetchAPI.put("users/send-code/", data),
    verifyPhoneApi:(data)=>fetchAPI.post("users/verify-phone/", data),
    registerApi:(data)=>fetchNoTokenAPI.post("users/register/", data),
    resetPassApi:(data)=>fetchNoTokenAPI.post(`users/reset-password/${data.id}/`, data.values),
    updateUserInfo:(data)=>fetchAPI.put("users/profile/update/", data),
    getInfoOfUser:()=>fetchAPI.get(`users/me/`),

    getProducts:(data)=>fetchAPI.get(`products/?page=${data}&limit=2`),
    getProductsById:(data)=>fetchAPI.get(`products/${data}/`),
    getProductsLiked:(data)=>fetchAPI.get(`products/liked/?page=${data}&limit=2`),
    getMyProducts:(data)=>fetchAPI.get(`products/my-products/?page=${data}&limit=2`),
    getProductsForPagination:(data)=>fetchAPI.get(`${data}`),
    getLikedProductsForPagination:(data)=>fetchAPI.get(`${data}`),
    likeProduct:(data)=>fetchAPI.post("products/like/", data),
    unLikeProduct:(data)=>fetchAPI.delete(`products/unlike/${data}`, ),
}