import CONFIG from './config.js'
import './models/index.js'
import { connectDB } from '#utils/db'
import app from './app.js'

const PORT = CONFIG.port

const startApp = async () => {
  await connectDB()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

startApp()
