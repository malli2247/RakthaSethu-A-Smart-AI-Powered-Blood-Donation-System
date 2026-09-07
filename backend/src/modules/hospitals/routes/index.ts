import { Router } from 'express';

export const hospitalRoutes = Router();

hospitalRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'hospitals', message: 'Phase 1 placeholder endpoint.' });
});
