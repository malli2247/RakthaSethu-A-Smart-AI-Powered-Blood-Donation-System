import { Router } from 'express';

export const notificationRoutes = Router();

notificationRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'notifications', message: 'Phase 1 placeholder endpoint.' });
});
