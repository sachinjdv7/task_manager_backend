import { Request, Response } from 'express'

export const getHealth = (req: Request, res: Response) => {
    console.log('health controller')
    return res.status(200).json({
        status: true,
        message: 'server is healthy',
    })
}
