"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      star: {
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      price: {
        type: Sequelize.STRING,
      },
      acreage: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      target: {
        type: Sequelize.STRING,
      },
      published: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
      },
      priceCode: {
        type: Sequelize.STRING,
      },
      areaCode: {
        type: Sequelize.STRING,
      },
      provinceCode: {
        type: Sequelize.STRING,
      },
      districtCode: {
        type: Sequelize.STRING,
      },
      categoryCode: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
