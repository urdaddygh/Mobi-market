import axios from "axios";
import { getCookie } from "../utils/cookieFunction/cookieFunction";

const access = getCookie("access")

const acc = localStorage.getItem("access")

console.log(acc)
const fetchAPI = axios.create({
    baseURL: "https://neobook.online/mobi-market/",
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
    },
});
const fetchAPIImage = axios.create({
    baseURL: "https://neobook.online/mobi-market/",
    headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
    },
});

const fetchAPIForChangePassword = axios.create({
    baseURL: "https://neobook.online/mobi-market/",
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${acc}`,
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
    changePassword:(data)=>fetchAPIForChangePassword.post("users/change-password/", data),
    sendCodeApi:(data)=>fetchAPI.put("users/send-code/", data),
    verifyPhoneApi:(data)=>fetchAPI.post("users/verify-phone/", data),
    registerApi:(data)=>fetchNoTokenAPI.post("users/register/", data),
    checkUser:(data)=>fetchNoTokenAPI.post("users/check-user/", data),
    resetPassApi:(data)=>fetchNoTokenAPI.post(`users/reset-password/${data.id}/`, data.values),
    updateUserInfo:(data)=>fetchAPI.put("users/profile/update/", data),
    getInfoOfUser:()=>fetchAPI.get(`users/me/`),

    getProducts:(data)=>fetchAPI.get(`products/?page=${data}&limit=3`),
    getProductsById:(data)=>fetchAPI.get(`products/${data}/`),
    getProductsLiked:(data)=>fetchAPI.get(`products/liked/?page=${data}&limit=3`),
    getMyProducts:(data)=>fetchAPI.get(`products/my-products/?page=${data}&limit=3`),
    getProductsForPagination:(data)=>fetchAPI.get(`${data}`),
    getLikedProductsForPagination:(data)=>fetchAPI.get(`${data}`),
    likeProduct:(data)=>fetchAPI.post("products/like/", data),
    changeProduct:(data)=>fetchAPI.put(`products/${data.id}/`, data.values),
    deleteProduct:(data)=>fetchAPI.delete(`products/${data}/`),
    addProduct:(data)=>fetchAPIImage.post("products/", data),
    unLikeProduct:(data)=>fetchAPI.delete(`products/unlike/${data}`, ),
}