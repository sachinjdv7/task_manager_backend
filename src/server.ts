import app from './app'
import { Config } from './config'

const startSever = () => {
    const PORT = Config.PORT
    try {
        app.listen(PORT, () => console.log(`Express Server listening ${PORT}`))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startSever()
