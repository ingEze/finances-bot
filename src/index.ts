import app from './app.js'
import dotenv from 'dotenv'
import logger from './utils/logger.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { botService } from './service/bot.service.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  logger.info('Client connected', socket.id)

  socket.on('message', async(msg: string) => {
    const response = await botService(String(msg))
    socket.emit('response', response)
  })

  socket.on('disconnect', () => logger.info('Client disconnect', socket.id))
})

httpServer.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`)
})
