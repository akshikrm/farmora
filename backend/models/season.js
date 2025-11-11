import { sequelize } from "#utils/db";
import { Sequelize } from "sequelize";

const SeasonModel = sequelize.define('seasons',
	{
		master_id: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		from_date: {
			type: Sequelize.DATE
		},
		to_date: {
			type: Sequelize.DATE
		},
		status: {
			type: Sequelize.ENUM("active", "inactive"),
			defaultValue: "active"
		},
	},
	{
		underscored: true,
		paranoid: true,
		timestamps: true,
	}
);


export default SeasonModel
