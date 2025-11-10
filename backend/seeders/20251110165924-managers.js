import bcrypt from "bcryptjs"

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		const hashedPassword = await bcrypt.hash('root', 10); // Replace with a secure password

		await queryInterface.bulkInsert('users', [
			{
				name: 'Jeevan Jose',
				username: 'jvnjose',
				password: hashedPassword,
				user_type: 'manager',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Raoof Subi',
				username: 'raoof',
				password: hashedPassword,
				user_type: 'manager',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);

	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', [
			{ username: 'jvnjose' },
			{ username: 'raoof' }
		], {});

	}
};
