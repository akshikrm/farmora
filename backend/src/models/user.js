import { sequelize } from '#utils/db';
import bcryptjs from 'bcryptjs';
import { Sequelize } from 'sequelize';

const { hash, compare } = bcryptjs

const user = (sequelize, DataTypes) => {
	const User = sequelize.define('users', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_type: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		reset_flag: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
		parant_id: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		last_login: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	});

	// Hash password before saving
	User.beforeCreate(async (user) => {
		user.password = await hash(user.password, 10);
	});

	// Instance method to compare passwords
	User.prototype.comparePassword = async function(password) {
		return compare(password, this.password);
	};

	return User;
};

export default user(sequelize, Sequelize)
