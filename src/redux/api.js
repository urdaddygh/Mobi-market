import axios from "axios";
import { getCookie } from "../utils/cookieFunction/cookieFunction";

const access = getCookie("access")
// const access = localStorage.getItem("access")

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
    getProductsForPagination:(data)=>fetchAPI.get(`${data}`),
    likeProduct:(data)=>fetchAPI.post("products/like/", data),
    // getUsers:(id)=>fetchAPI.get(`user-profile/${id}/`),
    // postGetAdress:(data)=>fetchAPI.post("citizen-address-info/", data),
    // postGetFamily:(data)=>fetchAPI.post("citizen-family-info/", data),
    // changePass:(data) =>fetchAPI.post("password-change", data),
}