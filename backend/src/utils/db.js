import { Sequelize } from 'sequelize';
import CONFIG from "../../config.js"

const { db_dialect, db_host, db_name, db_password, db_user } = CONFIG

export const sequelize = new Sequelize(db_name, db_user, db_password, {
	host: db_host,
	dialect: db_dialect,
	logging: false,

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


