import axios from "axios";
import { getCookie } from "../utils/cookieFunction/cookieFunction";

const access = getCookie("access")
// const access = localStorage.getItem("access")

const fetchAPI = axios.create({
    baseURL: "http://172.30.4.27/",
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
    authApi:(data)=>fetchNoTokenAPI.post("login/", data),
    registerApi:(data)=>fetchNoTokenAPI.post("users/register/", data),

    // getUsers:(id)=>fetchAPI.get(`user-profile/${id}/`),
    // postGetAdress:(data)=>fetchAPI.post("citizen-address-info/", data),
    // postGetFamily:(data)=>fetchAPI.post("citizen-family-info/", data),
    // changePass:(data) =>fetchAPI.post("password-change", data),
}