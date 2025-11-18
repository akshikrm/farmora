'use strict'
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      key: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
    await queryInterface.addIndex('permissions', ['key'], {
      unique: true,
      name: 'permissions_key_unique',
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions')
  },
}
