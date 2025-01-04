import app from './src/app'
import { calculateDiscount } from './src/utils'
import request from 'supertest'

describe('App test', () => {
    it('should return correct discount amount', () => {
        const discount = calculateDiscount(100, 10)
        expect(discount).toBe(10)
    })

    it('should retun status code 200', async () => {
        const response = await request(app).get('/').send()
        expect(response.statusCode).toBe(200)
    })
})
