import pino from 'pino'
import CONFIG from '../../config.js'

const logger = pino({
  level: CONFIG.logLevel,
  transport: { target: 'pino-pretty' },
})

export default logger
