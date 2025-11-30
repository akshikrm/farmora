import { sequelize } from '#utils/db'
import '../../models/index.js'

export const resetDB = async () => {
  await sequelize.drop()
}
