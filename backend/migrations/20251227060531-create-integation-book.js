'use strict'
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.sequelize.query(`
		          DO $$ BEGIN
			          CREATE TYPE enum_integration_books_status AS ENUM ('active', 'inactive');
				        EXCEPTION
		        WHEN duplicate_object THEN null;
		      END $$;
		    `)
    await queryInterface.sequelize.query(`
		          DO $$ BEGIN
			          CREATE TYPE enum_integration_books_payment_type AS ENUM ('credit', 'paid');
				        EXCEPTION
		        WHEN duplicate_object THEN null;
		      END $$;
		    `)

    await queryInterface.createTable('integration_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
      },
      payment_type: {
        type: DataTypes.ENUM('credit', 'paid'),
        defaultValue: 'credit',
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('integration_books')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_integration_books_status";'
    )
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_integration_books_payment_type";'
    )
  },
}
