import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: 'postgres',
});

export const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Database connected successfully.');
	} catch (error) {
		console.error('Database connection failed:', error.message);
		process.exit(1);
	}
};


