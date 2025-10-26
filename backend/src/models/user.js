import { sequelize } from '#utils/db';
import bcryptjs from 'bcryptjs';
import { Sequelize } from 'sequelize';

const { hash, compare } = bcryptjs

const UserModel = sequelize.define('users', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	user_type: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	reset_flag: {
		type: Sequelize.BOOLEAN,
		allowNull: true,
		defaultValue: false,
	},
	parant_id: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	last_login: {
		type: Sequelize.DATE,
		allowNull: true,
	},
});

// Hash password before saving
UserModel.beforeCreate(async (user) => {
	user.password = await hash(user.password, 10);
});

// Instance method to compare passwords
UserModel.prototype.comparePassword = async function(password) {
	return compare(password, this.password);
};


export default UserModel
