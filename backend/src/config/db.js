const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: 'postgres',
});

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Database connected successfully.');
	} catch (error) {
		console.error('Database connection failed:', error.message);
		process.exit(1); // Exit the app if the database connection fails
	}
};

module.exports = { connectDB, sequelize };
