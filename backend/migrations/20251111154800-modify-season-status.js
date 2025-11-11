'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		return await queryInterface.sequelize.transaction(async (transaction) => {
			await queryInterface.removeColumn("seasons", "status", { transaction })

			await queryInterface.addColumn("seasons", "status", {
				type: Sequelize.ENUM("active", "inactive"),
				allowNull: false,
				defaultValue: "active",
			}, { transaction })
		})

	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.sequelize.transaction(async (transaction) => {
			await queryInterface.removeColumn("seasons", "status", { transaction })
			await queryInterface.addColumn("seasons", "status", {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
			}, { transaction })
		}
		)
	}
};
