import dayjs from 'dayjs';

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		const validFrom = new dayjs().toDate();
		const validTo = new dayjs().add(6, 'month').toDate();
		await queryInterface.bulkInsert('subscriptions', [
			{
				user_id: 2,
				package_id: 1,
				valid_from: validFrom,
				valid_to: validTo,
				created_at: new Date(),
				updated_at: new Date(),

			},
			{
				user_id: 3,
				package_id: 1,
				valid_from: validFrom,
				valid_to: validTo,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {

	}
};
