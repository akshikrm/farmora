import balanceSheetService from '@services/balance-sheet.service'
import asyncHandler from '@utils/async-handler'
import logger from '@utils/logger'

const getBalanceSheet = async (req, res) => {
  const filter = {}

  if (req.query.from_date) {
    filter.from_date = req.query.from_date
  }
  if (req.query.to_date) {
    filter.to_date = req.query.to_date
  }
  if (req.query.purpose) {
    filter.purpose = req.query.purpose
  }

  logger.info(
    { filter, actor_id: req.user.id },
    'Balance sheet request received'
  )

  const data = await balanceSheetService.getBalanceSheet(filter, req.user)

  res.success(data, {
    message: 'Balance sheet fetched successfully',
  })
}

const balanceSheetController = {
  getBalanceSheet: asyncHandler(getBalanceSheet),
}

export default balanceSheetController
