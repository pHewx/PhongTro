import db from "../models";
const { Op } = require("sequelize");
import { v4 } from "uuid";
import { dataPrice, dataArea } from "../ultis/data";
import generateCode from "../ultis/generateCode";
import { getNumberFromString } from "../ultis/common";

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        include: [
          { model: db.Image, attributes: ["image"] },
          {
            model: db.User,
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "price",
          "acreage",
          "address",
          "description",
          "target",
          "published",
          "priceCode",
          "areaCode",
          "provinceCode",
          "categoryCode",
          "createdAt",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsLimitService = (
  page,
  query,
  { priceNumber, areaNumber }
) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(query);
      console.log(priceNumber, areaNumber);

      let offset = !page || page <= 1 ? 0 : page - 1;

      const queries = { ...query };

      if (priceNumber) queries.price = { [Op.between]: priceNumber };
      if (areaNumber) queries.acreage = { [Op.between]: areaNumber };

      const response = await db.Post.findAndCountAll({
        where: queries,
        offset: offset * process.env.LIMIT,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, attributes: ["image"] },
          {
            model: db.User,
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "price",
          "acreage",
          "address",
          "description",
          "target",
          "published",
          "priceCode",
          "areaCode",
          "provinceCode",
          "categoryCode",
          "createdAt",
        ],
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, attributes: ["image"] },
          {
            model: db.User,
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "price",
          "acreage",
          "address",
          "description",
          "target",
          "published",
          "priceCode",
          "areaCode",
          "provinceCode",
          "categoryCode",
          "createdAt",
        ],
      });

      console.log(response);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const createNewPostService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      let postId = v4();
      let images = data.images;

      const response = await db.Post.create({
        id: postId,
        title: data.title,
        star: 0,
        price: data.price,
        acreage: data.acreage,
        address: data.address,
        description: data.description,
        target: data.target,
        pusblished: "",
        userId: data.userId,
        priceCode: dataPrice.find(
          (price) => price.max > data.price && price.min <= data.price
        )?.code,
        areaCode: dataArea.find(
          (area) => area.max > data.acreage && area.min <= data.acreage
        )?.code,
        provinceCode: data.province,
        districtCode: data.district,
        categoryCode: data.categoryCode,
      });

      for (let i = 0; i < images.length; i++) {
        let imageId = v4();

        await db.Image.create({
          id: imageId,
          image: images[i],
          postId: postId,
        });
      }

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getMyPostService = (page, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const offset = !page || page <= 1 ? 0 : page - 1;

      const response = await db.Post.findAll({
        include: { model: db.Image, attributes: ["id", "image"] },
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateMyPostService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      let response = [];
      let images = data.images;

      const updated = await db.Post.update(
        {
          title: data.title,
          price: data.price,
          acreage: data.acreage,
          address: data.address,
          description: data.description,
          target: data.target,
          areaCode: data.areaCode,
          priceCode: data.priceCode,
          provinceCode: data.provinceCode,
          categoryCode: data.categoryCode,
        },
        {
          where: { id: data.id },
        }
      );

      for (let i = 0; i < images.length; i++) {
        let imageId = v4();
        await db.Image.create({
          id: imageId,
          image: images[i],
          postId: data.id,
        });
      }

      if (updated[0] === 1) {
        response = await db.Post.findAll({ id: data.id });
      }

      resolve({
        err: response.length < 1 ? 0 : 1,
        msg: response.length < 1 ? "OK" : "Finding post is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const removeMyPostService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: id },
        force: true,
      });

      console.log(response);

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Deletting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
