import { Router } from 'express';
import { forgotPassword, resetPassword, verifyResetToken } from '../controllers/passwordReset.controllers';

const router = Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify-token/:token', verifyResetToken);

export default router;
