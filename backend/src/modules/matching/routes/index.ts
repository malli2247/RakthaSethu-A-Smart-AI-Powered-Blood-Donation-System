import { Router } from 'express';

export const matchingRoutes = Router();

matchingRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'matching', message: 'Phase 1 placeholder endpoint.' });
});
