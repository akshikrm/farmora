import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import authRoutes from '#routes/auth.router'
import userRoutes from '#routes/user.router'
import packageRoutes from '#routes/package.router'
import subscriptionRouter from '#routes/subscription.router'
import farmsRouter from '#routes/farm.router'
import perimssionRouter from '#routes/permission.routes'
import rolesRouter from '#routes/role.router'
import seasonRouter from '#routes/season.router'
import batchRouter from '#routes/batch.router'
import vendorRouter from '#routes/vendor.router'
import itemsRouter from '#routes/items.router'
import itemReturnRouter from '#routes/item-return.router'
import integrationBookRouter from '#routes/integration-book.router'
import workingCostRouter from '#routes/working-cost.router'
import salesRouter from '#routes/sales.router'
import generalExpenseRouter from '#routes/general-expense.router'
import expenseSalesRouter from '#routes/expense-sales.router'

import responseHandler from '#middlewares/response.middleware'
import globalErrorHandler from '#middlewares/error.middleware'

const app = express()

const { json } = bodyParser

app.use(json())
app.use(cors())

app.use(responseHandler)

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/farms', farmsRouter)
app.use('/api/packages', packageRoutes)
app.use('/api/subscriptions', subscriptionRouter)
app.use('/api/permissions', perimssionRouter)
app.use('/api/roles', rolesRouter)
app.use('/api/seasons', seasonRouter)
app.use('/api/batches', batchRouter)
app.use('/api/vendors', vendorRouter)
app.use('/api/items', itemsRouter)
app.use('/api/item-returns', itemReturnRouter)
app.use('/api/integration-book', integrationBookRouter)
app.use('/api/working-costs', workingCostRouter)
app.use('/api/sales', salesRouter)
app.use('/api/general-expenses', generalExpenseRouter)
app.use('/api/expense-sales', expenseSalesRouter)

app.get('/', (_, res) => {
  res.json({ message: 'server is up and running', status: 'ok' })
})

app.use(globalErrorHandler)

export default app
