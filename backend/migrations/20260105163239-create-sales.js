'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
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
        type: Sequelize.INTEGER,
      },
      master_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      season_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      batch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vehicle_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      bird_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      avg_weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.ENUM('credit', 'cash'),
        defaultValue: 'cash',
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      narration: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
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
    await queryInterface.dropTable('sales')

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_sales_status";'
    )
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_sales_payment_type";'
    )
  },
}
