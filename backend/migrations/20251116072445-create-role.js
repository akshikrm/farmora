'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      manager_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
    await queryInterface.addIndex('roles', ['manager_id'], {
      name: 'roles_manager_id_index',
    })

    await queryInterface.addIndex('roles', ['manager_id', 'name'], {
      unique: true,
      name: 'roles_manager_name_unique',
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('roles')
  },
}
