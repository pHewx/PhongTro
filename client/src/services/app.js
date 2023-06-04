import axios from "axios";

export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_SERVER_URL + "/api/v1/price/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAreas = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_SERVER_URL + "/api/v1/area/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_SERVER_URL + "/api/v1/category/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_SERVER_URL + "/api/v1/province/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "https://vapi.vnappmob.com/api/province/",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicDistrict = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUploadImages = (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
        data: images,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
