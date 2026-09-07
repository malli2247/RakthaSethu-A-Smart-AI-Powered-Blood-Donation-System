import { Router } from 'express';

export const patientRoutes = Router();

patientRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'patients', message: 'Phase 1 placeholder endpoint.' });
});
