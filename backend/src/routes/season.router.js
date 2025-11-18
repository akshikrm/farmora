import { Router } from 'express'
import seasonController from '#controllers/season.controller'
import { validateSeason } from '#validators/config.validator'
import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'

const router = Router()

router.use(isAuthenticated)

router.post('/', validateSeason, isManagerOrAdmin, seasonController.create)
router.get('/', isAuthenticated, isManagerOrAdmin, seasonController.getAll)
router.get(
  '/:season_id',
  isAuthenticated,
  isManagerOrAdmin,
  seasonController.getById
)
router.put(
  '/:season_id',
  isAuthenticated,
  validateSeason,
  isManagerOrAdmin,
  seasonController.updateById
)
router.delete(
  '/:season_id',
  isAuthenticated,
  isManagerOrAdmin,
  seasonController.deleteById
)

export default router
