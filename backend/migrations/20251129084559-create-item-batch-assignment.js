'use strict'
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchase_batch_assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      batch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      purchase_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchase_batch_assignments')
  },
}
