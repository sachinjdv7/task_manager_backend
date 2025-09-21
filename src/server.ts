import app from './app'
import { Config } from './config'
import logger from './config/logger'
import { connectMongoDB } from './db/db'

console.log('mongo', Config.MONGO_URI)

const startSever = () => {
    const PORT = Config.PORT ?? 8001
    try {
        app.listen(PORT, () => {
            logger.info('Listening on port', { port: PORT })
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

connectMongoDB()
    ?.then(startSever)
    .catch((error) => logger.error(error))
