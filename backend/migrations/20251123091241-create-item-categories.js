'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE enum_items_status AS ENUM ('active', 'inactive');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE enum_items_type AS ENUM ('integration', 'working', 'regular');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await queryInterface.createTable('items', {
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
      name: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      base_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        field: 'base_price',
      },
      type: {
        type: DataTypes.ENUM('integration', 'working', 'regular'),
        defaultValue: 'regular',
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('items')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_items_status;'
    )
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_items_type;')
  },
}
