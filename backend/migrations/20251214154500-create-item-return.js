'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('item_returns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      return_type: {
        type: Sequelize.ENUM('vendor', 'batch'),
        allowNull: false,
      },
      item_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      from_batch: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      to_batch: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      to_vendor: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rate_per_bag: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      master_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'completed',
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
    await queryInterface.dropTable('item_returns')
  },
}
