import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const PurchaseBatchAssignmentModel = sequelize.define(
  'purchase_batch_assignments',
  {
    batch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default PurchaseBatchAssignmentModel
