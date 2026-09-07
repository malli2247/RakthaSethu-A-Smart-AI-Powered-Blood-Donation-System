import { Router } from 'express';
import { healthRouter } from './health.route.js';
import { authRouter } from '../modules/auth/auth.route.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
