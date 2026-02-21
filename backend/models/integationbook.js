import { sequelize } from '@utils/db'
import { Sequelize } from 'sequelize'

const IntegrationBookModel = sequelize.define(
  'integration_books',
  {
    farm_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_type: {
      type: Sequelize.ENUM('credit', 'paid'),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('inactive', 'active'),
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
