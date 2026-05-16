'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchase_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      master_id: {
	type: Sequelize.INTEGER,
	allowNull: false,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
	allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
	allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
	allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchase_books');
  }
};
