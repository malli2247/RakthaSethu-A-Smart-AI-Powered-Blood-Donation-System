import { Router } from 'express';

export const userRoutes = Router();

userRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'users', message: 'Phase 1 placeholder endpoint.' });
});
