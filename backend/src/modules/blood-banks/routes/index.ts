import { Router } from 'express';

export const bloodBankRoutes = Router();

bloodBankRoutes.get('/', (_req, res) => {
  res.status(200).json({ module: 'blood-banks', message: 'Phase 1 placeholder endpoint.' });
});
