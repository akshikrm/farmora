import { sequelize } from '#utils/db';
import userRoles from '#utils/user-roles';
import bcryptjs from 'bcryptjs';
import { Sequelize } from 'sequelize';
import SubscriptionModel from '#models/subscription';

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
		type: Sequelize.ENUM(userRoles.admin.type, userRoles.manager.type, userRoles.staff.type),
		defaultValue: userRoles.staff.type,
		allowNull: false,
		field: 'user_type',
	},
	status: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		field: 'status',
	},
	parent_id: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		field: 'parent_id',
	},
	last_login: {
		type: Sequelize.DATE,
		allowNull: true,
		field: 'last_login',
	},
}, {
	underscored: true,
	timestamps: true,
});

// Hash password before saving
UserModel.beforeCreate(async (user) => {
	user.password = await hash(user.password, 10);
});

// Instance method to compare passwords
UserModel.prototype.comparePassword = async function(password) {
	return compare(password, this.password);
};

UserModel.hasMany(SubscriptionModel, {
	foreignKey: 'user_id',
	as: 'subscriptions'
});


UserModel.belongsTo(UserModel,
	{
		foreignKey: 'parent_id',
		as: 'parent', targetKey: 'id'
	}
);

SubscriptionModel.belongsTo(UserModel, {
	foreignKey: 'user_id',
	as: 'user'
});


export default UserModel
