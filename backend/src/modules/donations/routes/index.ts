import { Router } from 'express';

export const donationRoutes = Router();

donationRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'donations', message: 'Phase 1 placeholder endpoint.' });
});
