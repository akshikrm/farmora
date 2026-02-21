import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const SubscriptionModel = sequelize.define(
  'subscriptions',
  {
    user_id: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'package_id',
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'valid_from',
    },
    valid_to: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'valid_to',
    },
  },
  {
    underscored: true,
    paranoid: true,
    timestamps: true,
  }
)

export default SubscriptionModel
