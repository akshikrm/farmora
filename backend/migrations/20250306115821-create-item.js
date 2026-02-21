'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE enum_purchases_status AS ENUM ('active', 'inactive');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE enum_purchases_payment_type AS ENUM ('credit', 'paid');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    await queryInterface.createTable('purchases', {
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
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      net_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      invoice_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      invoice_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null,
      },
      vendor_id: {
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
      price_per_unit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },
      payment_type: {
        type: DataTypes.ENUM('credit', 'paid'),
        defaultValue: 'credit',
        allowNull: false,
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
    await queryInterface.dropTable('purchases')

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_purchases_status";'
    )
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_purchases_payment_type";'
    )
  },
}
