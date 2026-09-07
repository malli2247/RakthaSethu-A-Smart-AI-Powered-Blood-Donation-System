import { Router } from 'express';

export const adminRoutes = Router();

adminRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'admin', message: 'Phase 1 placeholder endpoint.' });
});
