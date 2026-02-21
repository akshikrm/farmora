'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE enum_sales_status AS ENUM ('active', 'inactive');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE enum_sales_payment_type AS ENUM ('credit', 'cash');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await queryInterface.createTable('sales', {
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
      batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vehicle_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      bird_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avg_weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_type: {
        type: DataTypes.ENUM('credit', 'cash'),
        defaultValue: 'cash',
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      narration: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
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
    await queryInterface.dropTable('sales')

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_sales_status";'
    )
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_sales_payment_type";'
    )
  },
}
