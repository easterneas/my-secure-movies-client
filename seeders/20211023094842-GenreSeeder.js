'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createdAt = new Date()
    const updatedAt = new Date()

    await queryInterface.bulkInsert('Genres', [
      { name: "Thriller", createdAt, updatedAt },
      { name: "Romcom", createdAt, updatedAt },
      { name: "Comedy", createdAt, updatedAt },
      { name: "Action", createdAt, updatedAt },
      { name: "Sci-Fi", createdAt, updatedAt },
      { name: "Drama", createdAt, updatedAt },
      { name: "Mystery", createdAt, updatedAt },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
