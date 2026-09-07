import crypto from 'node:crypto';
import { Prisma, UserRole } from '@prisma/client';
import { ApiError } from '../../middleware/error.middleware.js';
import { comparePassword, hashPassword, signAccessToken } from '../../lib/auth.js';
import { prisma } from '../../lib/prisma.js';

const RESET_TOKEN_TTL_MINUTES = 30;

type RegisterInput = {
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
};

export const registerUser = async ({ email, phone, password, role }: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      phone,
      passwordHash,
      role
    },
    select: {
      id: true,
      email: true,
      phone: true,
      role: true,
      isVerified: true,
      createdAt: true
    }
  });

  return {
    user,
    token: signAccessToken(user.id, user.role)
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isValidPassword = await comparePassword(password, user.passwordHash);
  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return {
    token: signAccessToken(user.id, user.role),
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    }
  };
};

export const createPasswordResetToken = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { created: false };
  }

  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt
    }
  });

  return { created: true, rawToken };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true }
  });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    throw new ApiError(400, 'Invalid or expired reset token');
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash }
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() }
    }),
    prisma.auditLog.create({
      data: {
        userId: resetToken.userId,
        action: 'PASSWORD_RESET',
        entity: 'User',
        entityId: resetToken.userId,
        metadata: { source: 'self-service' } as Prisma.InputJsonValue
      }
    })
  ]);
};
