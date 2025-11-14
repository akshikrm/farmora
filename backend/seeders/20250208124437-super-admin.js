import bcrypt from "bcryptjs"

export default {
	up: async (queryInterface, Sequelize) => {
		const hashedPassword = await bcrypt.hash('admin123', 10); // Replace with a secure password

		await queryInterface.bulkInsert('users', [
			{
				name: 'Super Admin',
				username: 'superadmin',
				password: hashedPassword,
				user_type: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', { useremail: 'superadmin@example.com' }, {});
	},
};
