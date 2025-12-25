import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const PurchaseBatchAssignmentModel = sequelize.define(
  'purchase_batch_assignments',
  {
    batch_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    purchase_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default PurchaseBatchAssignmentModel
