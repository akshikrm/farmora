import { Router } from 'express'
import { isAuthenticated, isManagerOrAdmin } from '#middlewares/auth.middleware'
import { validateFarm } from '#validators/config.validator'
import farmController from '#controllers/farm.controller'

const router = Router()

router.post(
  '/',
  isAuthenticated,
  validateFarm,
  isManagerOrAdmin,
  farmController.create
)
router.get('/', isAuthenticated, isManagerOrAdmin, farmController.getAll)
router.get(
  '/:farm_id',
  isAuthenticated,
  isManagerOrAdmin,
  farmController.getById
)
router.put(
  '/:farm_id',
  isAuthenticated,
  validateFarm,
  isManagerOrAdmin,
  farmController.updateById
)
router.delete(
  '/:farm_id',
  isAuthenticated,
  isManagerOrAdmin,
  farmController.deletById
)

export default router
