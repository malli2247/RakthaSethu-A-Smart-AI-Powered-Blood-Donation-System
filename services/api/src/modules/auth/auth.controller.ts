import { Request, Response, NextFunction } from 'express';
import {
  createPasswordResetToken,
  loginUser,
  registerUser,
  resetPassword
} from './auth.service.js';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from './auth.validation.js';
import { env } from '../../config/env.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = registerSchema.parse(req.body);
    const result = await registerUser(payload);

    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = loginSchema.parse(req.body);
    const result = await loginUser(payload.email, payload.password);

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Logout successful on client side; discard token'
  });
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = forgotPasswordSchema.parse(req.body);
    const result = await createPasswordResetToken(payload.email);

    return res.status(200).json({
      success: true,
      message: 'If the email exists, password reset instructions have been initiated.',
      ...(env.NODE_ENV === 'development' && result.created ? { resetToken: result.rawToken } : {})
    });
  } catch (error) {
    return next(error);
  }
};

export const resetPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = resetPasswordSchema.parse(req.body);
    await resetPassword(payload.token, payload.newPassword);

    return res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    return next(error);
  }
};
