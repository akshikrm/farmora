import { sequelize } from "#utils/db";
import { Sequelize } from "sequelize";

const SubscriptionModel = sequelize.define('subscriptions',
	{
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		package_id: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		start_date: {
			type: Sequelize.DATE,
			allowNull: false
		},
		end_date: {
			type: Sequelize.DATE,
			allowNull: false
		},
		status: {
			type: Sequelize.ENUM("active", "expired", "cancelled"),
			defaultValue: "active"
		},
	},
	{
		paranoid: true,
		timestamps: true,
	}
);


export default SubscriptionModel
