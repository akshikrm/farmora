'use strict'
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subscription_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM(
          'card',
          'paypal',
          'bank_transfer',
          'cash',
          'other'
        ),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
        allowNull: true,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments')
  },
}
