'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('expense', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      invoice_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
      },
      batch_id: {
        type: DataTypes.INTEGER,
      },
      quatity: {
        type: DataTypes.DECIMAL(10, 2),
      },
      rate: {
        type: DataTypes.DECIMAL(10, 2),
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      net_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      payment_type: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('expense')
  },
}
