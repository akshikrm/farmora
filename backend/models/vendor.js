import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const VendorModel = sequelize.define(
  'vendors',
  {
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.TEXT,
    },
    opening_balance: {
      type: Sequelize.DECIMAL(10, 2),
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    underscored: true,
    paranoid: true,
    timestamps: true,
  }
)

export default VendorModel
