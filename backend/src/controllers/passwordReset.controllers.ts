import { Request, Response } from 'express';
import prisma from '../db/client';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../utils/emailConfig';
import bcrypt from 'bcrypt';

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    console.log('🟢 forgotPassword controller called');
    console.log('🟢 Request body:', req.body);
    const { email } = req.body;

    if (!email) {
      console.log('❌ No email provided');
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log('🟢 Looking for user with email:', email);
    const user = await prisma.user.findUnique({
      where: { email }
    });

    console.log('🟢 User found:', !!user);

    if (!user) {
      console.log('🟢 User not found, but returning success for security');
      return res.status(200).json({ 
        message: 'If an account exists with that email, a password reset link has been sent.' 
      });
    }

    console.log('🟢 Generating reset token...');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    console.log('🟢 Saving token to database...');
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    console.log('🟢 Sending email...');
    await sendPasswordResetEmail(email, resetToken);

    console.log('✅ Password reset process completed successfully');
    res.status(200).json({ 
      message: 'If an account exists with that email, a password reset link has been sent.' 
    });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Find user with valid token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date() // Token not expired
        }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    res.status(200).json({ message: 'Password has been reset successfully' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

export const verifyResetToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ valid: false, message: 'Invalid or expired token' });
    }

    res.status(200).json({ valid: true });

  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ valid: false, message: 'Error verifying token' });
  }
};
