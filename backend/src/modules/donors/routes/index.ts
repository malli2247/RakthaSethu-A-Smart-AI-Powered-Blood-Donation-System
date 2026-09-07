import { Router } from 'express';

export const donorRoutes = Router();

donorRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'donors', message: 'Phase 1 placeholder endpoint.' });
});
