import PurchaseModel from '#models/purchase'
import SalesModel from '#models/sales'
import BatchModel from '#models/batch'
import ItemModel from '#models/items.model'
import SeasonModel from '#models/season'
import VendorModel from '#models/vendor'
import PurchaseReturnModel from '#models/purchase-return'
import userRoles from '#utils/user-roles'
import { Op } from 'sequelize'
import logger from '#utils/logger'

const getBatchOverview = async (filter, currentUser) => {
  const { batch_id } = filter

  logger.debug(
    { batch_id, actor_id: currentUser.id },
    'Fetching batch overview'
  )

  // Build base where clause for user access control
  const userWhereClause = {}
  if (currentUser.user_type === userRoles.staff.type) {
    userWhereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    userWhereClause.master_id = currentUser.id
  }

  // Fetch batch details
  const batch = await BatchModel.findOne({
    where: {
      id: batch_id,
      ...userWhereClause,
    },
    include: [
      { model: SeasonModel, as: 'season', required: false },
    ],
  })

  if (!batch) {
    return {
      batch: null,
      expenses: [],
      sales: [],
      returns: [],
    }
  }

  // Fetch expenses (purchases) for this batch
  const purchases = await PurchaseModel.findAll({
    where: {
      batch_id: batch_id,
      ...userWhereClause,
    },
    include: [
      { model: ItemModel, as: 'category', required: false },
    ],
    order: [['invoice_date', 'ASC']],
  })

  // Fetch sales for this batch (exclude sales book entries)
  const sales = await SalesModel.findAll({
    where: {
      batch_id: batch_id,
      season_id: { [Op.ne]: null },
      ...userWhereClause,
    },
    order: [['date', 'ASC']],
  })

  // Fetch returned items from this batch
  const returns = await PurchaseReturnModel.findAll({
    where: {
      from_batch: batch_id,
      ...userWhereClause,
    },
    include: [
      { model: ItemModel, as: 'category', required: false },
    ],
    order: [['date', 'ASC']],
  })

  // Format expenses
  const expenses = purchases.map((purchase) => ({
    date: purchase.invoice_date,
    purpose: purchase.category?.name || 'N/A',
    quantity: purchase.quantity,
    price: parseFloat(purchase.price_per_unit),
    amount: parseFloat(purchase.net_amount),
  }))

  // Format sales
  const salesData = sales.map((sale) => ({
    date: sale.date,
    vehicle_no: sale.vehicle_no || 'N/A',
    weight: sale.weight ? parseFloat(sale.weight) : null,
    bird_no: sale.bird_no,
    avg_weight: sale.avg_weight ? parseFloat(sale.avg_weight) : null,
    price: sale.price ? parseFloat(sale.price) : null,
    amount: parseFloat(sale.amount),
  }))

  // Format returns
  const returnsData = returns.map((returnItem) => ({
    date: returnItem.date,
    purpose: returnItem.category?.name || 'N/A',
    quantity: returnItem.quantity,
    price: parseFloat(returnItem.rate_per_bag),
    amount: parseFloat(returnItem.total_amount),
  }))

  logger.info(
    {
      batch_id,
      expenses_count: expenses.length,
      sales_count: salesData.length,
      returns_count: returnsData.length,
    },
    'Batch overview fetched'
  )

  return {
    batch: {
      id: batch.id,
      name: batch.name,
      season: batch.season
        ? { id: batch.season.id, name: batch.season.name }
        : null,
    },
    expenses,
    sales: salesData,
    returns: returnsData,
  }
}

const overviewService = {
  getBatchOverview,
}

export default overviewService
