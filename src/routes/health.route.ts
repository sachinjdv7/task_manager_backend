import express from 'express'
import { getHealth } from '../controllers/health.controller'

export const heathRoute = express.Router()

heathRoute.get('/health', getHealth)
