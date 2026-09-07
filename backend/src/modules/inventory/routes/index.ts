import { Router } from 'express';

export const inventoryRoutes = Router();

inventoryRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'inventory', message: 'Phase 1 placeholder endpoint.' });
});
