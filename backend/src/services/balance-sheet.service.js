import PurchaseModel from '@models/purchase'
import SalesModel from '@models/sales'
import VendorModel from '@models/vendor'
import WorkingCostModel from '@models/workingcost'
import GeneralExpenseModel from '@models/generalexpense'
import ExpenseSalesModel from '@models/expensesales'
import IntegrationBookModel from '@models/integationbook'
import PurchaseReturnModel from '@models/purchase-return'
import userRoles from '@utils/user-roles'
import { Op } from 'sequelize'
import dayjs from 'dayjs'
import logger from '@utils/logger'

const getMasterId = (currentUser) => {
  if (currentUser.user_type === userRoles.staff.type) {
    return currentUser.master_id
  }
  return currentUser.id
}

const sumAmounts = (records, field) => {
  let total = 0
  for (let i = 0; i < records.length; i++) {
    const val = parseFloat(records[i][field])
    if (val && val > 0) {
      total = total + val
    }
  }
  return total
}

const getOpeningBalance = async (masterId) => {
  const vendors = await VendorModel.findAll({
    where: {
      master_id: masterId,
      status: 'active',
    },
    attributes: ['opening_balance'],
  })

  let total = 0
  for (let i = 0; i < vendors.length; i++) {
    const val = parseFloat(vendors[i].opening_balance)
    if (val) {
      total = total + val
    }
  }
  return total
}

const buildDateFilter = (startDate, endDate) => {
  const filter = {}

  if (startDate && endDate) {
    filter.date = {
      [Op.between]: [dayjs(startDate).toDate(), dayjs(endDate).toDate()],
    }
  } else if (startDate) {
    filter.date = { [Op.gte]: dayjs(startDate).toDate() }
  } else if (endDate) {
    filter.date = { [Op.lte]: dayjs(endDate).toDate() }
  }

  return filter
}

const getPurchasesData = async (masterId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate)

  const purchases = await PurchaseModel.findAll({
    where: {
      master_id: masterId,
      ...dateFilter,
    },
    attributes: ['net_amount', 'payment_type'],
  })

  let paidOut = 0
  let liability = 0

  for (let i = 0; i < purchases.length; i++) {
    const record = purchases[i]
    if (record.payment_type === 'paid') {
      paidOut = paidOut + sumAmounts([record], 'net_amount')
    } else {
      liability = liability + sumAmounts([record], 'net_amount')
    }
  }

  return { in: 0, out: paidOut, liability }
}

const getSalesData = async (masterId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate)

  const sales = await SalesModel.findAll({
    where: {
      master_id: masterId,
      ...dateFilter,
    },
    attributes: ['amount', 'payment_type'],
  })

  let cashIn = 0
  let receivable = 0

  for (let i = 0; i < sales.length; i++) {
    const record = sales[i]
    if (record.payment_type === 'cash') {
      cashIn = cashIn + sumAmounts([record], 'amount')
    } else {
      receivable = receivable + sumAmounts([record], 'amount')
    }
  }

  return { in: cashIn, out: 0, receivable }
}

const getPurchaseReturnsData = async (masterId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate)

  const returns = await PurchaseReturnModel.findAll({
    where: {
      master_id: masterId,
      ...dateFilter,
    },
    attributes: ['total_amount', 'payment_type'],
  })

  let paidIn = 0
  let liabilityReduction = 0

  for (let i = 0; i < returns.length; i++) {
    const record = returns[i]
    if (record.payment_type === 'paid') {
      paidIn = paidIn + sumAmounts([record], 'total_amount')
    } else {
      liabilityReduction = liabilityReduction + sumAmounts([record], 'total_amount')
    }
  }

  return { in: paidIn, out: 0, liabilityReduction }
}

const getWorkingCostsData = async (masterId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate)

  const records = await WorkingCostModel.findAll({
    where: {
      master_id: masterId,
      ...dateFilter,
    },
    attributes: ['amount', 'payment_type'],
  })

  let incomeIn = 0
  let expenseOut = 0

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    if (record.payment_type === 'income') {
      incomeIn = incomeIn + sumAmounts([record], 'amount')
    } else {
      expenseOut = expenseOut + sumAmounts([record], 'amount')
    }
  }

  return { in: incomeIn, out: expenseOut }
}

const getGeneralExpensesData = async (masterId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate)

  const records = await GeneralExpenseModel.findAll({
    where: {
      master_id: masterId,
      ...dateFilter,
    },
    attributes: ['amount'],
  })

  const totalOut = sumAmounts(records, 'amount')
  return { in: 0, out: totalOut }
}

const getExpenseSalesData = async (masterId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate)

  const records = await ExpenseSalesModel.findAll({
    where: {
      master_id: masterId,
      ...dateFilter,
    },
    attributes: ['amount'],
  })

  const totalIn = sumAmounts(records, 'amount')
  return { in: totalIn, out: 0 }
}

const getIntegrationBooksData = async (masterId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate)

  const records = await IntegrationBookModel.findAll({
    where: {
      master_id: masterId,
      ...dateFilter,
    },
    attributes: ['amount', 'payment_type'],
  })

  let paidOut = 0
  let liability = 0

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    if (record.payment_type === 'paid') {
      paidOut = paidOut + sumAmounts([record], 'amount')
    } else {
      liability = liability + sumAmounts([record], 'amount')
    }
  }

  return { in: 0, out: paidOut, liability }
}

const getBalanceSheet = async (filter, currentUser) => {
  const { from_date, to_date } = filter

  logger.debug(
    { from_date, to_date, actor_id: currentUser.id },
    'Fetching balance sheet'
  )

  const masterId = getMasterId(currentUser)

  const openingBalance = await getOpeningBalance(masterId)

  const purchasesData = await getPurchasesData(masterId, from_date, to_date)
  const salesData = await getSalesData(masterId, from_date, to_date)
  const purchaseReturnsData = await getPurchaseReturnsData(masterId, from_date, to_date)
  const workingCostsData = await getWorkingCostsData(masterId, from_date, to_date)
  const generalExpensesData = await getGeneralExpensesData(masterId, from_date, to_date)
  const expenseSalesData = await getExpenseSalesData(masterId, from_date, to_date)
  const integrationBooksData = await getIntegrationBooksData(masterId, from_date, to_date)

  const totalIn =
    salesData.in +
    purchaseReturnsData.in +
    workingCostsData.in +
    expenseSalesData.in

  const totalOut =
    purchasesData.out +
    workingCostsData.out +
    generalExpensesData.out +
    integrationBooksData.out

  const liability =
    purchasesData.liability +
    integrationBooksData.liability -
    purchaseReturnsData.liabilityReduction

  const receivable = salesData.receivable

  const net = totalIn - totalOut
  const closingBalance = openingBalance + net

  const breakdown = {
    purchases: {
      in: purchasesData.in,
      out: purchasesData.out,
      liability: purchasesData.liability,
    },
    sales: {
      in: salesData.in,
      out: 0,
      receivable: salesData.receivable,
    },
    purchase_returns: {
      in: purchaseReturnsData.in,
      out: 0,
      liability_reduction: purchaseReturnsData.liabilityReduction,
    },
    working_costs: {
      in: workingCostsData.in,
      out: workingCostsData.out,
    },
    general_expenses: {
      in: 0,
      out: generalExpensesData.out,
    },
    expense_sales: {
      in: expenseSalesData.in,
      out: 0,
    },
    integration_books: {
      in: 0,
      out: integrationBooksData.out,
      liability: integrationBooksData.liability,
    },
  }

  logger.info(
    {
      actor_id: currentUser.id,
      opening_balance: openingBalance,
      total_in: totalIn,
      total_out: totalOut,
      liability,
      receivable,
    },
    'Balance sheet fetched'
  )

  return {
    opening_balance: parseFloat(openingBalance.toFixed(2)),
    from_date: from_date || null,
    to_date: to_date || null,
    summary: {
      total_in: parseFloat(totalIn.toFixed(2)),
      total_out: parseFloat(totalOut.toFixed(2)),
      liability: parseFloat(liability.toFixed(2)),
      receivable: parseFloat(receivable.toFixed(2)),
      net: parseFloat(net.toFixed(2)),
      closing_balance: parseFloat(closingBalance.toFixed(2)),
    },
    breakdown,
  }
}

const balanceSheetService = {
  getBalanceSheet,
}

export default balanceSheetService
