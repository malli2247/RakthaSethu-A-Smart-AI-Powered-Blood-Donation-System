import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 12);

export const comparePassword = async (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

export const signAccessToken = (userId: string, role: string): string =>
  jwt.sign({ sub: userId, role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
