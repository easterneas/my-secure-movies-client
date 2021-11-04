'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createdAt = new Date()
    const updatedAt = new Date()

    await queryInterface.bulkInsert('Studios', [
      { name: "Budiman Productions", specialization: "Animation", createdAt, updatedAt },
      { name: "Hendro Pictures", specialization: "Live Action", createdAt, updatedAt },
      { name: "Jak Animations", specialization: "2D Animation", createdAt, updatedAt },
    ])
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Studios', null, {});
  }
};
