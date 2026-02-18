import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('dogController - positive test', () => {
  it('returns success JSON from getDogImage', async () => {
    const mockDog = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success',
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValueOnce(mockDog);
    const res: any = {
      status: vi.fn().mockReturnThis(), 
      json: vi.fn(),
    };
    const req: any = {};

    await getDogImage(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockDog,
    });
  });
});
