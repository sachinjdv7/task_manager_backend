import app from './app'
import { Config } from './config'
import logger from './config/logger'
import { connectMongoDB, disconnectMongoDB } from './db/db'

let server: ReturnType<typeof app.listen> // store http.Server

const startServer = async () => {
    const PORT = Config.PORT ?? 8001

    try {
        // Connect DB first
        await connectMongoDB()

        // Start server
        server = app.listen(PORT, () => {
            logger.info(`🚀 Server is live on port ${PORT} 🌐`)
        })
    } catch (error) {
        logger.error('❌ Failed to start server ⚠️', error)
        process.exit(1)
    }
}

/**
 * Graceful shutdown handler
 */
const shutdown = async (signal: string) => {
    logger.info(`🛑 Received ${signal} — shutting down gracefully...`)

    try {
        if (server) {
            await new Promise<void>((resolve, reject) => {
                server.close((err) => {
                    if (err) return reject(err)
                    resolve()
                })
            })
            logger.info('✅ HTTP server closed 📴')
        }

        await disconnectMongoDB()
        logger.info('🔌 MongoDB disconnected 🗄️')

        logger.info('👋 Shutdown complete. Exiting now.')
        process.exit(0)
    } catch (err) {
        logger.error('🔥 Error during shutdown 💥', err)
        process.exit(1)
    }
}

// Catch termination signals
process.on('SIGINT', () => {
    shutdown('SIGINT').catch((err) => {
        logger.error('❌ Error during SIGINT shutdown ⚠️', err)
        process.exit(1)
    })
})

process.on('SIGTERM', () => {
    shutdown('SIGTERM').catch((err) => {
        logger.error('❌ Error during SIGTERM shutdown ⚠️', err)
        process.exit(1)
    })
})

// Optional: catch unhandled errors
process.on('unhandledRejection', (reason) => {
    logger.error('💥 Unhandled Promise Rejection:', reason)
})

process.on('uncaughtException', (err) => {
    logger.error('💣 Uncaught Exception:', err)
    process.exit(1)
})

startServer().catch((err) => {
    logger.error('❌ Failed to start server ⚠️', err)
    process.exit(1)
})
