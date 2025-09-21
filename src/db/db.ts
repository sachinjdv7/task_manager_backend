import mongoose from 'mongoose'
import { Config } from '../config'
import logger from '../config/logger'

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(Config.MONGO_URI as string)
        logger.info('🚀 MongoDB connected')
    } catch (error) {
        logger.error('❌ Failed to connect MongoDB', error)
        process.exit(1)
    }
}

export const disconnectMongoDB = async () => {
    try {
        await mongoose.connection.close()
        logger.info('🔌 MongoDB disconnected')
    } catch (error) {
        logger.error('❌ Error disconnecting MongoDB', error)
    }
}
