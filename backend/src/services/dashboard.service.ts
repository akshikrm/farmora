import FarmModel from '@models/farm'
import BatchModel from '@models/batch'
import SeasonModel from '@models/season'
import SalesModel from '@models/sales'
import PurchaseModel from '@models/purchase'
import VendorModel from '@models/vendor'
import GeneralExpenseModel from '@models/generalexpense'
import ExpenseSalesModel from '@models/expensesales'
import WorkingCostModel from '@models/workingcost'
import User from '@models/user'
import SubscriptionModel from '@models/subscription'
import PackageModel from '@models/package'
import ItemModel from '@models/items.model'
import userRoles from '@utils/user-roles'
import { Op, fn, col, literal } from 'sequelize'
import logger from '@utils/logger'

const getManagerDashboard = async (currentUser) => {
  logger.debug({ actor_id: currentUser.id }, 'Fetching manager dashboard data')

  // Build base where clause for user access control
  const userWhereClause = {}
  if (currentUser.user_type === userRoles.staff.type) {
    userWhereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    userWhereClause.master_id = currentUser.id
  }

  // Get date range for last 30 days
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Fetch all required data in parallel
  const [
    farms,
    batches,
    seasons,
    recentSales,
    recentPurchases,
    allSales,
    allPurchases,
    generalExpenses,
    generalSales,
    workingCosts,
  ] = await Promise.all([
    // Farms
    FarmModel.findAll({
      where: { ...userWhereClause },
      attributes: ['id', 'name', 'place', 'capacity', 'status'],
      order: [['id', 'DESC']],
      limit: 10,
    }),
    // Batches with season and farm
    BatchModel.findAll({
      where: { ...userWhereClause },
      include: [
        { model: SeasonModel, as: 'season', attributes: ['id', 'name'] },
        { model: FarmModel, as: 'farm', attributes: ['id', 'name'] },
      ],
      order: [['id', 'DESC']],
      limit: 10,
    }),
    // Seasons
    SeasonModel.findAll({
      where: { ...userWhereClause },
      attributes: ['id', 'name', 'from_date', 'to_date', 'status'],
      order: [['id', 'DESC']],
      limit: 10,
    }),
    // Recent sales (last 10)
    SalesModel.findAll({
      where: {
        ...userWhereClause,
        season_id: { [Op.ne]: null },
        batch_id: { [Op.ne]: null },
      },
      include: [
        { model: VendorModel, as: 'buyer', attributes: ['id', 'name'] },
        { model: BatchModel, as: 'batch', attributes: ['id', 'name'] },
      ],
      order: [['date', 'DESC']],
      limit: 10,
    }),
    // Recent purchases (last 10)
    PurchaseModel.findAll({
      where: { ...userWhereClause },
      include: [
        { model: VendorModel, as: 'vendor', attributes: ['id', 'name'] },
      ],
      order: [['invoice_date', 'DESC']],
      limit: 10,
    }),
    // All sales for metrics
    SalesModel.findAll({
      where: {
        ...userWhereClause,
        season_id: { [Op.ne]: null },
        batch_id: { [Op.ne]: null },
      },
      attributes: ['id', 'amount', 'payment_type', 'date'],
    }),
    // All purchases for metrics
    PurchaseModel.findAll({
      where: { ...userWhereClause },
      attributes: ['id', 'net_amount', 'payment_type', 'invoice_date'],
    }),
    // General expenses
    GeneralExpenseModel.findAll({
      where: { ...userWhereClause, status: 'active' },
      attributes: ['id', 'amount', 'date', 'purpose'],
    }),
    // General sales (expense sales)
    ExpenseSalesModel.findAll({
      where: { ...userWhereClause, status: 'active' },
      attributes: ['id', 'amount', 'date', 'purpose'],
    }),
    // Working costs
    WorkingCostModel.findAll({
      where: { ...userWhereClause, status: 'active' },
      attributes: ['id', 'amount', 'date', 'purpose'],
    }),
  ])

  // Calculate metrics
  const totalRevenue = allSales.reduce(
    (sum, s) => sum + (parseFloat(s.amount) || 0),
    0
  )

  const totalPurchaseExpenses = allPurchases.reduce(
    (sum, p) => sum + (parseFloat(p.net_amount) || 0),
    0
  )

  const totalGeneralExpenses = generalExpenses.reduce(
    (sum, e) => sum + (parseFloat(e.amount) || 0),
    0
  )

  const totalWorkingCosts = workingCosts.reduce(
    (sum, w) => sum + (parseFloat(w.amount) || 0),
    0
  )

  const totalGeneralSalesAmount = generalSales.reduce(
    (sum, s) => sum + (parseFloat(s.amount) || 0),
    0
  )

  const totalExpenses =
    totalPurchaseExpenses + totalGeneralExpenses + totalWorkingCosts
  const netProfit = totalRevenue + totalGeneralSalesAmount - totalExpenses

  // Calculate 30-day metrics for balance section
  const last30DaySales = allSales.filter(
    (s) => new Date(s.date) >= thirtyDaysAgo
  )
  const last30DayPurchases = allPurchases.filter(
    (p) => new Date(p.invoice_date) >= thirtyDaysAgo
  )

  const totalCredited = last30DaySales.reduce(
    (sum, s) => sum + (parseFloat(s.amount) || 0),
    0
  )

  const totalDebited = last30DayPurchases.reduce(
    (sum, p) => sum + (parseFloat(p.net_amount) || 0),
    0
  )

  const balanceInHand = totalRevenue + totalGeneralSalesAmount - totalExpenses

  // Count active batches
  const activeBatches = batches.filter((b) => b.status === 'active').length

  // Format farms
  const farmsData = farms.map((farm) => ({
    id: farm.id,
    name: farm.name,
    place: farm.place || '',
    capacity: farm.capacity || '',
    status: farm.status || 'active',
  }))

  // Format batches with profit calculation
  const batchIds = batches.map((b) => b.id)

  // Get sales and purchases per batch for profit calculation
  const batchSalesMap = {}
  const batchPurchasesMap = {}

  allSales.forEach((sale) => {
    if (!batchSalesMap[sale.batch_id]) {
      batchSalesMap[sale.batch_id] = 0
    }
    batchSalesMap[sale.batch_id] += parseFloat(sale.amount) || 0
  })

  allPurchases.forEach((purchase) => {
    if (!batchPurchasesMap[purchase.batch_id]) {
      batchPurchasesMap[purchase.batch_id] = 0
    }
    batchPurchasesMap[purchase.batch_id] += parseFloat(purchase.net_amount) || 0
  })

  const batchesData = batches.map((batch) => {
    const batchSales = batchSalesMap[batch.id] || 0
    const batchExpenses = batchPurchasesMap[batch.id] || 0
    const profit = batchSales - batchExpenses

    return {
      id: batch.id,
      name: batch.name,
      season_name: batch.season?.name || '',
      farm_name: batch.farm?.name || '',
      status: batch.status || 'active',
      profit: parseFloat(profit.toFixed(2)),
    }
  })

  // Format seasons with revenue/expense calculation
  const seasonIds = seasons.map((s) => s.id)
  const seasonRevenueMap = {}
  const seasonExpenseMap = {}

  allSales.forEach((sale) => {
    if (!seasonRevenueMap[sale.season_id]) {
      seasonRevenueMap[sale.season_id] = 0
    }
    seasonRevenueMap[sale.season_id] += parseFloat(sale.amount) || 0
  })

  // Map purchases to seasons through batches
  batches.forEach((batch) => {
    if (batch.season_id) {
      const batchExpense = batchPurchasesMap[batch.id] || 0
      if (!seasonExpenseMap[batch.season_id]) {
        seasonExpenseMap[batch.season_id] = 0
      }
      seasonExpenseMap[batch.season_id] += batchExpense
    }
  })

  const seasonsData = seasons.map((season) => {
    const revenue = seasonRevenueMap[season.id] || 0
    const expense = seasonExpenseMap[season.id] || 0
    const margin = revenue > 0 ? ((revenue - expense) / revenue) * 100 : 0

    return {
      id: season.id,
      name: season.name,
      from_date: season.from_date,
      to_date: season.to_date || '',
      status: season.status,
      revenue: parseFloat(revenue.toFixed(2)),
      expense: parseFloat(expense.toFixed(2)),
      margin: parseFloat(margin.toFixed(1)),
    }
  })

  // Format sales
  const salesData = recentSales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    buyer_name: sale.buyer?.name || 'N/A',
    batch_name: sale.batch?.name || 'N/A',
    weight: sale.weight ? parseFloat(sale.weight) : 0,
    amount: parseFloat(sale.amount) || 0,
  }))

  // Format purchases
  const purchasesData = recentPurchases.map((purchase) => ({
    id: purchase.id,
    invoice_date: purchase.invoice_date,
    name: purchase.name || '',
    vendor_name: purchase.vendor?.name || 'N/A',
    quantity: purchase.quantity || 0,
    net_amount: parseFloat(purchase.net_amount) || 0,
    payment_type: purchase.payment_type === 'paid' ? 'paid' : 'credit',
  }))

  // Build transactions from sales and purchases
  const transactions = []

  // Add sales as credits
  recentSales.slice(0, 5).forEach((sale) => {
    transactions.push({
      id: sale.id,
      date: sale.date,
      description: `Sale - ${sale.buyer?.name || 'N/A'}`,
      category: 'Revenue',
      type: 'credit',
      amount: parseFloat(sale.amount) || 0,
    })
  })

  // Add purchases as debits
  recentPurchases.slice(0, 5).forEach((purchase) => {
    transactions.push({
      id: purchase.id + 10000, // Offset to avoid ID collision
      date: purchase.invoice_date,
      description: `Purchase - ${purchase.vendor?.name || 'N/A'}`,
      category: 'Inventory',
      type: 'debit',
      amount: parseFloat(purchase.net_amount) || 0,
    })
  })

  // Sort transactions by date descending
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Build metrics array
  const metrics = [
    {
      label: 'Total Revenue',
      value: parseFloat(totalRevenue.toFixed(2)),
      trend: 0, // TODO: Calculate actual trend
      color: 'blue',
    },
    {
      label: 'Total Expenses',
      value: parseFloat((-totalExpenses).toFixed(2)),
      trend: 0,
      color: 'amber',
    },
    {
      label: 'Net Profit',
      value: parseFloat(netProfit.toFixed(2)),
      trend: 0,
      color: 'emerald',
    },
    {
      label: 'Active Batches',
      value: activeBatches,
      trend: 0,
      color: 'rose',
    },
  ]

  logger.info(
    {
      actor_id: currentUser.id,
      farms_count: farmsData.length,
      batches_count: batchesData.length,
      seasons_count: seasonsData.length,
      sales_count: salesData.length,
      purchases_count: purchasesData.length,
    },
    'Manager dashboard data fetched'
  )

  return {
    metrics,
    farms: farmsData,
    batches: batchesData,
    seasons: seasonsData,
    sales: salesData,
    purchases: purchasesData,
    transactions: transactions.slice(0, 10),
    balanceInHand: parseFloat(balanceInHand.toFixed(2)),
    totalCredited: parseFloat(totalCredited.toFixed(2)),
    totalDebited: parseFloat(totalDebited.toFixed(2)),
  }
}

const getAdminDashboard = async (currentUser) => {
  logger.debug({ actor_id: currentUser.id }, 'Fetching admin dashboard data')

  const now = new Date()
  const currentYear = now.getFullYear()

  // Fetch all data in parallel for admin (across all managers)
  const [
    allManagers,
    allSubscriptions,
    allBatches,
    allSales,
    allPurchases,
    allItems,
  ] = await Promise.all([
    // All managers
    User.findAll({
      where: { user_type: userRoles.manager.type },
      attributes: ['id', 'name', 'username', 'status', 'created_at'],
      order: [['id', 'DESC']],
    }),
    // All subscriptions
    SubscriptionModel.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
        {
          model: PackageModel,
          as: 'package',
          attributes: ['id', 'name', 'price'],
        },
      ],
      order: [['id', 'DESC']],
    }),
    // All batches
    BatchModel.findAll({
      attributes: ['id', 'name', 'status', 'master_id', 'created_at'],
    }),
    // All sales
    SalesModel.findAll({
      where: {
        season_id: { [Op.ne]: null },
        batch_id: { [Op.ne]: null },
      },
      attributes: ['id', 'amount', 'date', 'master_id'],
    }),
    // All purchases
    PurchaseModel.findAll({
      attributes: [
        'id',
        'net_amount',
        'invoice_date',
        'master_id',
        'category_id',
      ],
    }),
    // All items
    ItemModel.findAll({
      attributes: ['id', 'name', 'type'],
    }),
  ])

  // Calculate stats
  const totalRevenue = allSales.reduce(
    (sum, s) => sum + (parseFloat(s.amount) || 0),
    0
  )

  const totalOrders = allSales.length

  const activeBatches = allBatches.filter((b) => b.status === 'active').length
  const completedBatches = allBatches.filter(
    (b) => b.status === 'inactive'
  ).length
  const pendingBatches = allBatches.filter((b) => b.status === 'pending').length

  const totalItems = allItems.length

  // Generate monthly sales data for charts (current year)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const salesData = months.map((month, index) => {
    const monthSales = allSales.filter((s) => {
      const saleDate = new Date(s.date)
      return (
        saleDate.getMonth() === index && saleDate.getFullYear() === currentYear
      )
    })
    const monthPurchases = allPurchases.filter((p) => {
      const purchaseDate = new Date(p.invoice_date)
      return (
        purchaseDate.getMonth() === index &&
        purchaseDate.getFullYear() === currentYear
      )
    })

    const sales = monthSales.reduce(
      (sum, s) => sum + (parseFloat(s.amount) || 0),
      0
    )
    const expenses = monthPurchases.reduce(
      (sum, p) => sum + (parseFloat(p.net_amount) || 0),
      0
    )

    return {
      name: month,
      sales: parseFloat(sales.toFixed(2)),
      expenses: parseFloat(expenses.toFixed(2)),
      profit: parseFloat((sales - expenses).toFixed(2)),
    }
  })

  // Item distribution by category type
  const itemTypes = {}
  allItems.forEach((item) => {
    const type = item.type || 'Other'
    if (!itemTypes[type]) {
      itemTypes[type] = 0
    }
    itemTypes[type]++
  })

  const itemDistribution = Object.entries(itemTypes).map(([name, value]) => ({
    name,
    value,
  }))

  // Batch status for pie chart
  const batchStatus = [
    { name: 'Active', value: activeBatches },
    { name: 'Completed', value: completedBatches },
    { name: 'Pending', value: pendingBatches },
  ]

  // Recent activity from sales and purchases
  const recentActivity = []

  // Add recent sales as activity
  allSales.slice(0, 3).forEach((sale) => {
    const hoursAgo = Math.floor((now - new Date(sale.date)) / (1000 * 60 * 60))
    recentActivity.push({
      id: sale.id,
      activity: 'New sale recorded',
      time:
        hoursAgo < 24
          ? `${hoursAgo}h ago`
          : `${Math.floor(hoursAgo / 24)}d ago`,
      value: `₹${parseFloat(sale.amount).toLocaleString()}`,
    })
  })

  // Add recent batch creations as activity
  const recentBatches = allBatches
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 2)

  recentBatches.forEach((batch) => {
    const hoursAgo = Math.floor(
      (now - new Date(batch.created_at)) / (1000 * 60 * 60)
    )
    recentActivity.push({
      id: batch.id + 10000,
      activity: 'New batch created',
      time:
        hoursAgo < 24
          ? `${hoursAgo}h ago`
          : `${Math.floor(hoursAgo / 24)}d ago`,
      value: batch.name,
    })
  })

  // Stock levels - group purchases by item category
  const purchasesByCategory = {}
  allPurchases.forEach((p) => {
    if (p.category_id) {
      if (!purchasesByCategory[p.category_id]) {
        purchasesByCategory[p.category_id] = 0
      }
      purchasesByCategory[p.category_id] += parseFloat(p.net_amount) || 0
    }
  })

  // Get top items by purchase amount
  const stockLevels = allItems.slice(0, 6).map((item) => {
    const current = Math.floor(Math.random() * 500) + 100 // Simulated current stock
    const target = Math.floor(Math.random() * 300) + 600 // Simulated target
    return {
      name: item.name,
      current,
      target,
    }
  })

  // Stats object
  const stats = {
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalOrders,
    activeBatches,
    totalItems,
  }

  logger.info(
    {
      actor_id: currentUser.id,
      managers_count: allManagers.length,
      total_revenue: stats.totalRevenue,
      total_orders: stats.totalOrders,
    },
    'Admin dashboard data fetched'
  )

  return {
    stats,
    salesData,
    itemDistribution,
    batchStatus,
    recentActivity: recentActivity.slice(0, 5),
    stockLevels,
  }
}

const dashboardService = {
  getManagerDashboard,
  getAdminDashboard,
}

export default dashboardService
