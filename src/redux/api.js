import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/cookieFunction/cookieFunction";

const access = getCookie("access")

const baseConfig = {
    baseURL: "https://neobook.online/mobi-market/",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  };
  
  const fetchAPI = axios.create(baseConfig);

  const fetchAPIImage = axios.create({
    ...baseConfig,
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${access}`,
    },
  });


  const fetchNoTokenAPI = axios.create({
    baseURL: "https://neobook.online/mobi-market/",
    headers: {
      "Content-type": "application/json",
    },
  });
  
 const handleUnauthorizedError = async (error) => {
  if (error.response.status === 401) {
    try {
      const res = await fetchNoTokenAPI.post("users/login/refresh/", { refresh: getCookie("refresh") });
      setCookie("access", res.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
      return axios(error.config);
    } catch (refreshError) {
      removeCookie("access");
      removeCookie("refresh");
      window.location.href = "/";
    }
  }


  return Promise.reject(error);
};

[fetchAPI, fetchAPIImage, fetchNoTokenAPI].forEach((instance) => {
  instance.interceptors.response.use(undefined, handleUnauthorizedError);
});
export const requests = {
    authApi:(data)=>fetchNoTokenAPI.post("users/login/", data),
    getRefreshToken:(data)=>fetchNoTokenAPI.post("users/login/refresh/", data),
    forgotPassword:(data)=>fetchNoTokenAPI.post("users/forgot-password/", data),
    changePassword:(data)=>fetchAPI.post("users/change-password/", data),
    sendCodeApi:(data)=>fetchAPI.put("users/send-code/", data),
    verifyPhoneApi:(data)=>fetchAPI.post("users/verify-phone/", data),
    registerApi:(data)=>fetchNoTokenAPI.post("users/register/", data),
    checkUser:(data)=>fetchNoTokenAPI.post("users/check-user/", data),
    resetPassApi:(data)=>fetchNoTokenAPI.post(`users/reset-password/${data.id}/`, data.values),
    updateUserInfo:(data)=>fetchAPIImage.put("users/profile/update/", data),
    getInfoOfUser:()=>fetchAPI.get(`users/me/`),

    getProducts:(data)=>fetchAPI.get(`products/?page=${data}&limit=32`),
    getProductsById:(data)=>fetchAPI.get(`products/${data}/`),
    getProductsLiked:(data)=>fetchAPI.get(`products/liked/?page=${data}&limit=32`),
    getMyProducts:(data)=>fetchAPI.get(`products/my-products/?page=${data}&limit=32`),
    getProductsForPagination:(data)=>fetchAPI.get(`${data}`),
    getLikedProductsForPagination:(data)=>fetchAPI.get(`${data}`),
    likeProduct:(data)=>fetchAPI.post("products/like/", data),
    changeProduct:(data)=>fetchAPIImage.put(`products/${data.id}/`, data.formData),
    deleteProduct:(data)=>fetchAPI.delete(`products/${data}/`),
    addProduct:(data)=>fetchAPIImage.post("products/", data),
    unLikeProduct:(data)=>fetchAPI.delete(`products/unlike/${data}`, ),
}