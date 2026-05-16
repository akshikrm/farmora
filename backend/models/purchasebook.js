import { sequelize } from '@utils/db'
import { Sequelize } from 'sequelize'

const PurchaseBook = sequelize.define(
  'purchase_books',
  {
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default PurchaseBook

