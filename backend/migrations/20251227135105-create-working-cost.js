'use strict'
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
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
        type: Sequelize.INTEGER,
      },
      season_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      master_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.ENUM('income', 'expense'),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('working_costs')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_working_costs_status";'
    )
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_working_costs_payment_type";'
    )
  },
}
