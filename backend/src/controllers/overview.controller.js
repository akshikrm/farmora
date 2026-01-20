import overviewService from '#services/overview.service'
import asyncHandler from '#utils/async-handler'
import logger from '#utils/logger'

const getBatchOverview = async (req, res) => {
  const filter = {
    batch_id: parseInt(req.query.batch_id),
  }

  logger.info({ filter }, 'Batch overview request received')
  const overviewData = await overviewService.getBatchOverview(filter, req.user)

  res.success(overviewData, {
    message: 'Batch overview fetched successfully',
  })
}

const getSeasonOverview = async (req, res) => {
  const filter = {
    season_id: parseInt(req.query.season_id),
  }

  logger.info({ filter }, 'Season overview request received')
  const overviewData = await overviewService.getSeasonOverview(filter, req.user)

  res.success(overviewData, {
    message: 'Season overview fetched successfully',
  })
}

const overviewController = {
  getBatchOverview: asyncHandler(getBatchOverview),
  getSeasonOverview: asyncHandler(getSeasonOverview),
}

export default overviewController
