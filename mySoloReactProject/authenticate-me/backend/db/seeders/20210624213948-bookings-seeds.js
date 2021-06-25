'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Bookings', [
        {spotId: 8, userId: 3, startDate: "2021-07-20", endDate: "2021-07-22", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 3, userId: 3, startDate: "2021-10-20", endDate: "2021-10-22", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 13, userId: 3, startDate: "2021-11-20", endDate: "2021-11-22", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 20, userId: 1, startDate: "2021-07-20", endDate: "2021-07-22", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 11, userId: 1, startDate: "2021-07-20", endDate: "2021-07-22", createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Bookings', null, {});
  }
};
