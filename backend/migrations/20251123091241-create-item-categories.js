'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE enum_item_categories_status AS ENUM ('active', 'inactive');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE enum_item_categories_type AS ENUM ('integration', 'working', 'regular');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await queryInterface.createTable('item_categories', {
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
      name: { type: Sequelize.STRING, allowNull: false },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      type: {
        type: Sequelize.ENUM('integration', 'working', 'regular'),
        defaultValue: 'regular',
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
        type: Sequelize.DATE,
        allowNull: true,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('item_categories')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_item_categories_status;'
    )
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_item_categories_type;'
    )
  },
}
