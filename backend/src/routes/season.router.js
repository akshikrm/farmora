import { Router } from 'express'
import seasonController from '#controllers/season.controller'
import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import validate from '#utils/validate-request'
import {
  newSeasonSchema,
  updateSeasonSchema,
} from '#validators/season.validator'

const router = Router()

router.use(isAuthenticated)

router.post(
  '/',
  validate(newSeasonSchema),
  isManagerOrAdmin,
  seasonController.create
)

router.get('/', isAuthenticated, isManagerOrAdmin, seasonController.getAll)

router.get(
  '/names',
  isAuthenticated,
  isManagerOrAdmin,
  seasonController.getNames
)

router.get(
  '/:season_id',
  isAuthenticated,
  isManagerOrAdmin,
  seasonController.getById
)
router.put(
  '/:season_id',
  validate(updateSeasonSchema),
  isAuthenticated,
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
