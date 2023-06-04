import axiosConfig from "../axiosConfig";

export const apiGetPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/post/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPostsLimit = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetNewPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/new-post`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateNewPost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/post`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetMyPost = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateMyPost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/v1/post`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiRemoveMyPost = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/post/` + id,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
