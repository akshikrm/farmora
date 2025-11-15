'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      master_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      place: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.STRING,
      },
      own: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('farms')
  },
}
