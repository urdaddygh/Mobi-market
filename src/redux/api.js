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
    forgotPassword:(data)=>fetchNoTokenAPI.post("users/forgot-password/", data),
    registerApi:(data)=>fetchNoTokenAPI.post("users/register/", data),
    getProducts:(data)=>fetchAPI.get(`products/?page=${data}&limit=2`),
    getProductsById:(data)=>fetchAPI.get(`products/${data}/`),
    getProductsLiked:()=>fetchAPI.get(`products/liked/`),
    getProductsForPagination:(data)=>fetchAPI.get(`${data}`),
    likeProduct:(data)=>fetchAPI.post("products/like/", data),
    unLikeProduct:(data)=>fetchAPI.post("products/unlike/", data),
    updateUserInfo:(data)=>fetchAPI.put("users/profile/update/", data),
}