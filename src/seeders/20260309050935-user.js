"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("pass123", 10);
    const password1 = await bcrypt.hash("pass1234", 10);
    const password2 = await bcrypt.hash("pass1235", 10);
    const password3 = await bcrypt.hash("pass1236", 10);
    const password4 = await bcrypt.hash("pass1237", 10);
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
        id: "7ad51c44-5baa-4b57-972a-52a03faf3fb9",
        name: "Admin King",
        email: "admin@example.com",
        mobile: "2319467981",
        password: password,
        gender: "male",
        birthdate: "1990-05-10",
        status: "active",
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "55212d7c-d615-46ae-b083-7cbeda77129e",
        name: "Mr.Droid",
        email: "droid@example.com",
        mobile: "6009294531",
        password: password1,
        gender: "male",
        birthdate: "1991-01-25",
        status: "inactive",
        role: "student",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "cc15253a-c3a4-4670-a9ae-8c57a98a1714",
        name: "Naman",
        email: "naman@example.com",
        mobile: "5678342567",
        password: password2,
        gender: "male",
        birthdate: "1654-01-10",
        status: "active",
        role: "student",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "d06e53ed-97e2-43d8-afff-fb50d2af2914",
        name: "Sneha",
        email: "sneha@example.com",
        mobile: "6419995564",
        password: password3,
        gender: "female",
        birthdate: "2004-11-14",
        status: "active",
        role: "student",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "db164b41-7769-4caf-8b33-fa27d0a462d9",
        name: "Rony",
        email: "rony@example.com",
        mobile: "7773332367",
        password: password4,
        gender: "male",
        birthdate: "1350-02-28",
        status: "active",
        role: "student",
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
