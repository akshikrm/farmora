import bcrypt from "bcryptjs"

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		const hashedPassword = await bcrypt.hash('root', 10);

		await queryInterface.bulkInsert('users', [
			{
				name: 'Sreenadh PP',
				username: 'sree',
				parent_id: 2,
				password: hashedPassword,
				user_type: 'staff',
				created_at: new Date('2024-01-20'),
				updated_at: new Date('2024-01-20'),
			},
			{
				name: 'Balu NS',
				username: 'balu',
				parent_id: 3,
				password: hashedPassword,
				user_type: 'staff',
				created_at: new Date('2024-02-15'),
				updated_at: new Date('2024-02-15'),
			},
			{
				name: 'Amit Kumar',
				username: 'amit',
				parent_id: 2,
				password: hashedPassword,
				user_type: 'staff',
				created_at: new Date('2024-03-25'),
				updated_at: new Date('2024-03-25'),
			},
			{
				name: 'Lakshmi Menon',
				username: 'lakshmi',
				parent_id: 4,
				password: hashedPassword,
				user_type: 'staff',
				created_at: new Date('2024-04-10'),
				updated_at: new Date('2024-04-10'),
			},
			{
				name: 'Ravi Tiwari',
				username: 'ravi',
				parent_id: 5,
				password: hashedPassword,
				user_type: 'staff',
				created_at: new Date('2024-05-18'),
				updated_at: new Date('2024-05-18'),
			},
			{
				name: 'Divya Reddy',
				username: 'divya',
				parent_id: 6,
				password: hashedPassword,
				user_type: 'staff',
				created_at: new Date('2024-06-08'),
				updated_at: new Date('2024-06-08'),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', [
			{ username: 'sree' },
			{ username: 'balu' },
			{ username: 'amit' },
			{ username: 'lakshmi' },
			{ username: 'ravi' },
			{ username: 'divya' }
		], {});
	}
};
