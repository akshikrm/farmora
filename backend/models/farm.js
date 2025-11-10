import { sequelize } from "#utils/db";
import { Sequelize } from "sequelize";

const FarmModel = sequelize.define('farms',
	{
		master_id: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		place: {
			type: Sequelize.STRING,
		},
		capacity: {
			type: Sequelize.STRING,
		},
		own: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		status: {
			type: Sequelize.INTEGER,
			defaultValue: 1
		},
	},
	{
		underscored: true,
		paranoid: true,
		timestamps: true,
	}
);


export default FarmModel
