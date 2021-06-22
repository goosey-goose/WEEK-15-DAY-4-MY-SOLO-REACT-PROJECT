'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      addressLine1: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      addressLine2: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      addressLine3: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      addressLine4: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      lat: {
        type: Sequelize.DOUBLE(5,20),
        allowNull: false
      },
      lng: {
        type: Sequelize.DOUBLE(5,20),
        allowNull: false
      },
      spotName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Spots');
  }
};
