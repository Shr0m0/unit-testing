import { describe, it, expect } from 'vitest'

type DogData = {
  imageUrl: string
}

type DogApiSuccessResponse = {
  success: true
  data: DogData
}

type DogApiErrorResponse = {
  success?: false
  error: string
}

type DogApiResponse = DogApiSuccessResponse | DogApiErrorResponse

describe('Dog API - Positive', () => {
  it('should return random dog image', async () => {
    const response = await fetch('http://localhost:5000/api/dogs/random')

    expect(response.status).toBe(200)

    const body = (await response.json()) as DogApiResponse

    if ('success' in body && body.success) {
      expect(body.data).toBeDefined()
      expect(body.data.imageUrl).toBeDefined()
      expect(typeof body.data.imageUrl).toBe('string')
    } else {
      throw new Error('Expected a success response, but got an error')
    }
  })
})

describe('Dog API - Negative', () => {
  it('should return 404 for invalid route', async () => {
    const response = await fetch('http://localhost:5000/api/dogs/invalid')

    expect(response.status).toBe(404)

    const body = (await response.json()) as DogApiResponse

    if ('error' in body) {
      expect(body.error).toBeDefined()
      expect(body.error).toContain('Route not found')
    } else {
      throw new Error('Expected an error response, but got success')
    }
  })
})