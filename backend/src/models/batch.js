import { sequelize } from "#utils/db";
import { Sequelize } from "sequelize";

const BatchModel = sequelize.define('batchs',
	{
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		season_id: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		farm_id: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		status: {
			type: Sequelize.INTEGER,
			defaultValue: 1
		},
	},
	{
		paranoid: true,
		timestamps: true,
	}
);



export default BatchModel
