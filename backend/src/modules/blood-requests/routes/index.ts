import { Router } from 'express';

export const bloodRequestRoutes = Router();

bloodRequestRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'blood-requests', message: 'Phase 1 placeholder endpoint.' });
});
