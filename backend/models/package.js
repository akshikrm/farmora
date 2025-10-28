import { sequelize } from "#utils/db";
import { Sequelize } from "sequelize";

const PackageModel = sequelize.define('packages',
	{
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT
		},
		price: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false
		},
		duration: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		status: {
			type: Sequelize.BOOLEAN, defaultValue: true
		}
	},
	{
		paranoid: true,
		timestamps: true,
	}
);



export default PackageModel
