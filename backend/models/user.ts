import { sequelize } from '@utils/db'
import userRoles from '@utils/user-roles'
import bcryptjs from 'bcryptjs'
import { DataTypes } from 'sequelize'

const { hash, compare } = bcryptjs

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
      type: DataTypes.ENUM(
        userRoles.admin.type,
        userRoles.manager.type,
        userRoles.staff.type
      ),
      defaultValue: userRoles.staff.type,
      allowNull: false,
      field: 'user_type',
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'status',
    },
    parent_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'parent_id',
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

// Hash password before saving
User.beforeCreate(async (user) => {
  user.password = await hash(user.password, 10)
})

// Instance method to compare passwords
User.prototype.comparePassword = async function (password) {
  return compare(password, this.password)
}

export default User
