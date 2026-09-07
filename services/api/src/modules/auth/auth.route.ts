import { Router } from 'express';
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPasswordHandler
} from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPasswordHandler);
