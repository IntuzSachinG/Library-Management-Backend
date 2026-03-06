"use strict";
// import bcrypt from "bcryptjs";
const bcrypt = require('bcryptjs');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync("Hello", 10);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("users", [
      {
        id: "9db72f06-27ec-4cdc-9699-51fb57aa8f79",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        mobile: "1234567890",
        password: hashedPassword,
        gender: "male",
        birthdate: "1990-12-11",
        status: "active",
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
  },
};
