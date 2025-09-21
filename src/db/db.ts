import mongoose from 'mongoose'
import { Config } from '../config'
import logger from '../config/logger'

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(Config.MONGO_URI as string)
        logger.info('\n 🚀 Mongodb connected')
    } catch (error) {
        logger.error('Failed to connect mongo db', error)
        process.exit(1)
    }
}
