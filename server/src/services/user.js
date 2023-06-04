import db from "../models";
import { hashPassword } from "../ultis/workWithPassword";

// GET CURRENT
export const getCurrentServices = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getUserServices = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateOneServices = ({ data }) =>
  new Promise(async (resolve, reject) => {
    try {
      let id = data.id;
      const response = await db.User.update(
        {
          name: data.name,
          phone: data.phone,
          avatar: data.avatar,
          zalo: "https://zalo.me/" + data.phone,
        },
        {
          where: {
            id: id,
          },
        }
      );

      resolve({
        err: response[0] ? 0 : 1,
        msg: response[0] ? "OK" : "Failed to update user.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
