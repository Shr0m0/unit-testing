import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn()
}))

import dogRoutes from '../routes/dogRoutes'
import { getDogImage } from '../controllers/dogController'

describe('DogRoutes', () => {

  let app: any

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/api/dogs', dogRoutes)
    vi.clearAllMocks()
  })

  it('should return 200 and success true', async () => {

    ;(getDogImage as any).mockImplementation((_req: any, res: any) => {
      return res.status(200).json({
        success: true,
        data: {
          imageUrl: 'mocked-dog.jpg'
        }
      })
    })

    const response = await request(app)
      .get('/api/dogs/random')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.imageUrl)
      .toContain('mocked-dog.jpg')
  })

  it('should return 500 and error message', async () => {

    ;(getDogImage as any).mockImplementation((_req: any, res: any) => {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch dog image: Network error'
      })
    })

    const response = await request(app)
      .get('/api/dogs/random')

    expect(response.status).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.error)
      .toBe('Failed to fetch dog image: Network error')
  })
})