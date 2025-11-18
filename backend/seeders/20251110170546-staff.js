import bcrypt from "bcryptjs"

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		const hashedPassword = await bcrypt.hash('root', 10); // Replace with a secure password

		await queryInterface.bulkInsert('users', [
			{
				name: 'Sreenadh PP',
				username: 'sree',
				parent_id: 2,
				password: hashedPassword,
				user_type: 'staff',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Balu NS',
				username: 'balu',
				parent_id: 3,
				password: hashedPassword,
				user_type: 'staff',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', [
			{ username: 'sree' },
			{ username: 'balu' }
		], {});
	}
};
