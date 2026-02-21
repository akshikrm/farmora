'use strict'
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.sequelize.query(`
		          DO $$ BEGIN
			          CREATE TYPE enum_working_costs_status AS ENUM ('active', 'inactive');
				        EXCEPTION
		        WHEN duplicate_object THEN null;
		      END $$;
		    `)
    await queryInterface.sequelize.query(`
		          DO $$ BEGIN
			          CREATE TYPE enum_working_costs_payment_type AS ENUM ('income', 'expense');
				        EXCEPTION
		        WHEN duplicate_object THEN null;
		      END $$;
		    `)

    await queryInterface.createTable('working_costs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
      },
      payment_type: {
        type: DataTypes.ENUM('income', 'expense'),
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
    await queryInterface.dropTable('working_costs')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_working_costs_status";'
    )
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_working_costs_payment_type";'
    )
  },
}
