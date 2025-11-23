import { Router } from 'express'
import { newManageSchema } from '#validators/user.validator'
import authController from '#controllers/auth.controller'
import validate from '#utils/validate-request'

const router = Router()

router.post('/signup', validate(newManageSchema), authController.createManager)

router.post('/login', authController.login)

export default router
