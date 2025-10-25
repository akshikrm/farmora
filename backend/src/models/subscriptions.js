import { sequelize } from "#utils/db";
import { Sequelize } from "sequelize";

const subscriptions = (sequelize, DataTypes) => {
	const Subscriptions = sequelize.define('subscriptions',
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			package_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			start_date: {
				type: DataTypes.DATE,
				allowNull: false
			},
			end_date: {
				type: DataTypes.DATE,
				allowNull: false
			},
			status: {
				type: DataTypes.ENUM("active", "expired", "cancelled"),
				defaultValue: "active"
			},
		},
		{
			paranoid: true,
			timestamps: true,
		}
	);

	return Subscriptions;
};

export default subscriptions(sequelize, Sequelize)
