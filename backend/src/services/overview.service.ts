import PurchaseModel from '@models/purchase'
import SalesModel from '@models/sales'
import BatchModel from '@models/batch'
import ItemModel from '@models/items.model'
import SeasonModel from '@models/season'
import PurchaseReturnModel from '@models/purchase-return'
import GeneralExpenseModel from '@models/generalexpense'
import ExpenseSalesModel from '@models/expensesales'
import userRoles from '@utils/user-roles'
import { Op } from 'sequelize'
import logger from '@utils/logger'

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
    include: [{ model: SeasonModel, as: 'season', required: false }],
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
    include: [{ model: ItemModel, as: 'category', required: false }],
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
    include: [{ model: ItemModel, as: 'category', required: false }],
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

const getSeasonOverview = async (filter, currentUser) => {
  const { season_id } = filter

  logger.debug(
    { season_id, actor_id: currentUser.id },
    'Fetching season overview'
  )

  // Build base where clause for user access control
  const userWhereClause = {}
  if (currentUser.user_type === userRoles.staff.type) {
    userWhereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    userWhereClause.master_id = currentUser.id
  }

  // Fetch season details
  const season = await SeasonModel.findOne({
    where: {
      id: season_id,
      ...userWhereClause,
    },
  })

  if (!season) {
    return {
      season: null,
      batches: [],
      general_costs: [],
      general_sales: [],
      summary: {
        total_batch_profit: 0,
        total_general_cost: 0,
        total_general_sales: 0,
        investor_profit: 0,
      },
    }
  }

  // Fetch all batches for this season
  const batches = await BatchModel.findAll({
    where: {
      season_id: season_id,
      ...userWhereClause,
    },
  })

  if (batches.length === 0) {
    // Still fetch general expenses and sales even if no batches
    const generalExpensesEmpty = await GeneralExpenseModel.findAll({
      where: {
        season_id: season_id,
        status: 'active',
        ...userWhereClause,
      },
      order: [['date', 'ASC']],
    })

    const generalSalesEmpty = await ExpenseSalesModel.findAll({
      where: {
        season_id: season_id,
        status: 'active',
        ...userWhereClause,
      },
      order: [['date', 'ASC']],
    })

    const generalCostsEmpty = generalExpensesEmpty.map((expense) => ({
      id: expense.id,
      date: expense.date,
      purpose: expense.purpose,
      amount: parseFloat(expense.amount),
    }))

    const generalSalesDataEmpty = generalSalesEmpty.map((sale) => ({
      id: sale.id,
      date: sale.date,
      purpose: sale.purpose,
      amount: parseFloat(sale.amount),
    }))

    const totalGeneralCostEmpty = generalCostsEmpty.reduce(
      (sum, c) => sum + c.amount,
      0
    )
    const totalGeneralSalesEmpty = generalSalesDataEmpty.reduce(
      (sum, s) => sum + s.amount,
      0
    )
    const investorProfitEmpty = -totalGeneralCostEmpty + totalGeneralSalesEmpty

    return {
      season: { id: season.id, name: season.name },
      batches: [],
      general_costs: generalCostsEmpty,
      general_sales: generalSalesDataEmpty,
      summary: {
        total_batch_profit: 0,
        total_general_cost: parseFloat(totalGeneralCostEmpty.toFixed(2)),
        total_general_sales: parseFloat(totalGeneralSalesEmpty.toFixed(2)),
        investor_profit: parseFloat(investorProfitEmpty.toFixed(2)),
      },
    }
  }

  const batchIds = batches.map((b) => b.id)

  // Fetch all purchases for these batches
  const purchases = await PurchaseModel.findAll({
    where: {
      batch_id: { [Op.in]: batchIds },
      ...userWhereClause,
    },
    include: [{ model: ItemModel, as: 'category', required: false }],
  })

  // Fetch all sales for these batches
  const sales = await SalesModel.findAll({
    where: {
      batch_id: { [Op.in]: batchIds },
      season_id: season_id,
      ...userWhereClause,
    },
  })

  // Fetch all returns for these batches
  const returns = await PurchaseReturnModel.findAll({
    where: {
      from_batch: { [Op.in]: batchIds },
      ...userWhereClause,
    },
  })

  // Group data by batch
  const purchasesByBatch = {}
  const salesByBatch = {}
  const returnsByBatch = {}

  batchIds.forEach((id) => {
    purchasesByBatch[id] = []
    salesByBatch[id] = []
    returnsByBatch[id] = []
  })

  purchases.forEach((p) => {
    if (purchasesByBatch[p.batch_id]) {
      purchasesByBatch[p.batch_id].push(p)
    }
  })

  sales.forEach((s) => {
    if (salesByBatch[s.batch_id]) {
      salesByBatch[s.batch_id].push(s)
    }
  })

  returns.forEach((r) => {
    if (returnsByBatch[r.from_batch]) {
      returnsByBatch[r.from_batch].push(r)
    }
  })

  // Calculate metrics for each batch
  const batchOverviews = batches.map((batch) => {
    const batchPurchases = purchasesByBatch[batch.id] || []
    const batchSales = salesByBatch[batch.id] || []
    const batchReturns = returnsByBatch[batch.id] || []

    // Calculate close_date (last sale date)
    let closeDate = null
    if (batchSales.length > 0) {
      const saleDates = batchSales.map((s) => new Date(s.date))
      closeDate = new Date(Math.max(...saleDates))
    }

    // Calculate total weight sold
    const totalWeightSold = batchSales.reduce(
      (sum, s) => sum + (parseFloat(s.weight) || 0),
      0
    )

    // Calculate total birds sold
    const totalBirdsSold = batchSales.reduce(
      (sum, s) => sum + (parseInt(s.bird_no) || 0),
      0
    )

    // Calculate average weight
    const avgWeight = totalBirdsSold > 0 ? totalWeightSold / totalBirdsSold : 0

    // Calculate total feed consumed (purchases where category type is 'regular' or name contains 'feed')
    const feedPurchases = batchPurchases.filter(
      (p) =>
        p.category?.type === 'regular' ||
        p.category?.name?.toLowerCase().includes('feed')
    )
    const totalFeedConsumed = feedPurchases.reduce(
      (sum, p) => sum + (parseInt(p.quantity) || 0),
      0
    )

    // FCR = Total feed consumed / Total weight gained
    const fcr = totalWeightSold > 0 ? totalFeedConsumed / totalWeightSold : 0

    // Calculate total expenses
    const totalExpenses = batchPurchases.reduce(
      (sum, p) => sum + (parseFloat(p.net_amount) || 0),
      0
    )

    // Calculate total return value
    const totalReturns = batchReturns.reduce(
      (sum, r) => sum + (parseFloat(r.total_amount) || 0),
      0
    )

    // Net cost = total expenses - returns
    const netCost = totalExpenses - totalReturns

    // Calculate total sales amount
    const totalSalesAmount = batchSales.reduce(
      (sum, s) => sum + (parseFloat(s.amount) || 0),
      0
    )

    // CFSR = Cost per bird sold (net cost / total birds sold)
    const cfsr = totalBirdsSold > 0 ? netCost / totalBirdsSold : 0

    // Average cost per kg
    const avgCost = totalWeightSold > 0 ? netCost / totalWeightSold : 0

    // Average rate per kg (selling rate)
    const avgRate = totalWeightSold > 0 ? totalSalesAmount / totalWeightSold : 0

    // Profit = Total sales - Net cost
    const profit = totalSalesAmount - netCost

    // Profit/Loss percentage
    const profitLossPercentage = netCost > 0 ? (profit / netCost) * 100 : 0

    return {
      batch_id: batch.id,
      batch_name: batch.name,
      close_date: closeDate,
      avg_weight: parseFloat(avgWeight.toFixed(2)),
      fcr: parseFloat(fcr.toFixed(3)),
      cfsr: parseFloat(cfsr.toFixed(2)),
      avg_cost: parseFloat(avgCost.toFixed(2)),
      avg_rate: parseFloat(avgRate.toFixed(2)),
      profit_loss_percentage: parseFloat(profitLossPercentage.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
    }
  })

  logger.info(
    {
      season_id,
      batches_count: batchOverviews.length,
    },
    'Season overview fetched'
  )

  // Calculate total batch profit for investor profit calculation
  const totalBatchProfit = batchOverviews.reduce((sum, b) => sum + b.profit, 0)

  // Fetch general expenses for this season
  const generalExpenses = await GeneralExpenseModel.findAll({
    where: {
      season_id: season_id,
      status: 'active',
      ...userWhereClause,
    },
    order: [['date', 'ASC']],
  })

  // Fetch general sales for this season
  const generalSales = await ExpenseSalesModel.findAll({
    where: {
      season_id: season_id,
      status: 'active',
      ...userWhereClause,
    },
    order: [['date', 'ASC']],
  })

  // Format general expenses
  const generalCosts = generalExpenses.map((expense) => ({
    id: expense.id,
    date: expense.date,
    purpose: expense.purpose,
    amount: parseFloat(expense.amount),
  }))

  // Format general sales
  const generalSalesData = generalSales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    purpose: sale.purpose,
    amount: parseFloat(sale.amount),
  }))

  // Calculate totals
  const totalGeneralCost = generalCosts.reduce((sum, c) => sum + c.amount, 0)
  const totalGeneralSales = generalSalesData.reduce(
    (sum, s) => sum + s.amount,
    0
  )

  // Investor Profit = Total Batch Profit - Total General Cost + Total General Sales
  const investorProfit = totalBatchProfit - totalGeneralCost + totalGeneralSales

  return {
    season: { id: season.id, name: season.name },
    batches: batchOverviews,
    general_costs: generalCosts,
    general_sales: generalSalesData,
    summary: {
      total_batch_profit: parseFloat(totalBatchProfit.toFixed(2)),
      total_general_cost: parseFloat(totalGeneralCost.toFixed(2)),
      total_general_sales: parseFloat(totalGeneralSales.toFixed(2)),
      investor_profit: parseFloat(investorProfit.toFixed(2)),
    },
  }
}

const overviewService = {
  getBatchOverview,
  getSeasonOverview,
}

export default overviewService
