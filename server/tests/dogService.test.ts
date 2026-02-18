import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

const mockApiResponse = {
  message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
  status: 'success',
};

vi.stubGlobal('fetch', vi.fn());

beforeEach(() => {
  vi.resetAllMocks();
});

describe('dogService', () => {
  // Positive test
  it('returns a dog image successfully', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiResponse.message);
    expect(result.status).toBe('success');
    expect(fetch).toHaveBeenCalledOnce();
  });

  // Negative test
  it('throws an error when API returns failure', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ status: 'error' }),
    });

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );

    expect(fetch).toHaveBeenCalledOnce();
  });
});
