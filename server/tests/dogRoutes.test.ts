import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../index';
import * as dogService from '../services/dogService';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('dogRoutes', () => {
  // Positive Route Test
  it('GET /api/dogs/random returns mocked dog image', async () => {
    const mockDog = {
      imageUrl: 'https://images.dog.ceo/breeds/stbernard/n02109525_15579_jpg',
      status: 'success',
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValueOnce(mockDog);

    const res = await request(app).get('/api/dogs/random');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imageUrl).toBe(mockDog.imageUrl);
  });

  // Negative Route Test
  it('GET /api/dogs/random returns 500 when service fails', async () => {
    vi.spyOn(dogService, 'getRandomDogImage').mockRejectedValueOnce(
      new Error('Network error')
    );

    const res = await request(app).get('/api/dogs/random');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      success: false,
      error: 'Network error', 
    });
  });
});
