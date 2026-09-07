import jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { comparePassword, hashPassword, signAccessToken } from '../lib/auth.js';
import { env } from '../config/env.js';

describe('Auth utilities', () => {
  it('hashes and verifies passwords', async () => {
    const password = 'Str0ngPassw0rd!';
    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    await expect(comparePassword(password, hash)).resolves.toBe(true);
  });

  it('signs JWT access tokens with role payload', () => {
    const token = signAccessToken('user_1', 'DONOR');
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string; role: string };

    expect(payload.sub).toBe('user_1');
    expect(payload.role).toBe('DONOR');
  });
});
