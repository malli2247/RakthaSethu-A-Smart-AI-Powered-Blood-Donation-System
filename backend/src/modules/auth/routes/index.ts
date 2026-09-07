import { Router } from 'express';

export const authRoutes = Router();

authRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'auth', message: 'Phase 1 placeholder endpoint.' });
});
