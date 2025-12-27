import bcrypt from "bcryptjs"

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		const hashedPassword = await bcrypt.hash('root', 10);

		await queryInterface.bulkInsert('users', [
			{
				name: 'Jeevan Jose',
				username: 'jvnjose',
				password: hashedPassword,
				user_type: 'manager',
				created_at: new Date('2024-01-15'),
				updated_at: new Date('2024-01-15'),
			},
			{
				name: 'Raoof Subi',
				username: 'raoof',
				password: hashedPassword,
				user_type: 'manager',
				created_at: new Date('2024-02-10'),
				updated_at: new Date('2024-02-10'),
			},
			{
				name: 'Priya Sharma',
				username: 'priya',
				password: hashedPassword,
				user_type: 'manager',
				created_at: new Date('2024-03-20'),
				updated_at: new Date('2024-03-20'),
			},
			{
				name: 'Arjun Patel',
				username: 'arjun',
				password: hashedPassword,
				user_type: 'manager',
				created_at: new Date('2024-04-05'),
				updated_at: new Date('2024-04-05'),
			},
			{
				name: 'Meera Nair',
				username: 'meera',
				password: hashedPassword,
				user_type: 'manager',
				created_at: new Date('2024-05-12'),
				updated_at: new Date('2024-05-12'),
			},
		]);

	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', [
			{ username: 'jvnjose' },
			{ username: 'raoof' },
			{ username: 'priya' },
			{ username: 'arjun' },
			{ username: 'meera' }
		], {});

	}
};
