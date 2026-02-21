import { Router } from 'express'
import { isAuthenticated } from '@middlewares/auth.middleware'
import subscriptionController from '@controllers/subscription.controller'

const subscriptionRouter = Router()

subscriptionRouter.post(
  '/subscribe',
  isAuthenticated,
  subscriptionController.create
)

subscriptionRouter.get('/', isAuthenticated, subscriptionController.getAll)

export default subscriptionRouter
