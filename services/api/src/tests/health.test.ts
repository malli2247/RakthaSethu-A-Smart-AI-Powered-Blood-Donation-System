import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../app.js';

describe('Health endpoint', () => {
  it('returns API health status', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'RakthaSethu API is healthy'
    });
  });
});
