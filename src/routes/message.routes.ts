import { Router } from 'express'
import { botController } from 'src/controller/bot.controller.js'

const msgRouter = Router()

msgRouter.get('/message', botController)

export default msgRouter
