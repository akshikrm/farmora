import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const IntegrationBookModel = sequelize.define(
  'integration_books',
  {
    farm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.ENUM('credit', 'paid'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('inactive', 'active'),
      defaultValue: 'active',
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default IntegrationBookModel
