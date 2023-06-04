import axios from "../axiosConfig";

export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/get-user/" + id,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateCurrent = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "patch",
        url: "/api/v1/user/update-current",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
