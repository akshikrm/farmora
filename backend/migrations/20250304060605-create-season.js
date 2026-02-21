'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('seasons', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_date: {
        type: DataTypes.DATEONLY,
      },
      to_date: {
        type: DataTypes.DATEONLY,
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
    await queryInterface.dropTable('seasons')
  },
}
