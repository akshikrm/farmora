import { sequelize } from "#utils/db";
import { Sequelize } from "sequelize";

const packages = (sequelize, DataTypes) => {
	const Package = sequelize.define('packages',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			status: {
				type: DataTypes.BOOLEAN, defaultValue: true
			}
		},
		{
			paranoid: true,
			timestamps: true,
		}
	);

	return Package;
};


export default packages(sequelize, Sequelize)
