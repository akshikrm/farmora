import CONFIG from './config'
import { connectDB } from '@utils/db'
import app from './app'
import './models/index'

const PORT = CONFIG.port

const startApp = async () => {
  await connectDB()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

startApp()
