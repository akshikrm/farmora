import pino from 'pino'
import CONFIG from '../../config.js'
import fs from 'fs'

// const stream = fs.createWriteStream('./logs/app.log', { flags: 'a' })

// const logger = pino(
//   {
//     level: CONFIG.logLevel,
//     transport: { target: 'pino-pretty' },
//   },
//   stream
// )

const logger = {
  info: () => null,
  debug: () => null,
}

export default logger
