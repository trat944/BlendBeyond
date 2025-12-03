import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PasswordResetService } from '../../services/PasswordResetService';
import { InputField } from '../../styled_components/inputField';
import { Modal } from '../../components/Modal';
import './resetPasswordPage.css';

export const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenValid(false);
        return;
      }

      try {
        const result = await PasswordResetService.verifyToken(token);
        setTokenValid(result.valid);
      } catch (error) {
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const onSubmit = handleSubmit(async (data) => {
    if (!token) return;

    try {
      await PasswordResetService.resetPassword(token, data.password);
      setResetSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrorMessage('Failed to reset password. Please try again.');
    }
  });

  if (tokenValid === null) {
    return (
      <div className="login-container">
        <div className="brand-section">
          <img className='logo' src='/logo.webp' alt="logo" />
        </div>
        <Modal onOpen={() => navigate('/')}>
          <div className="form-container">
            <p>Verifying token...</p>
          </div>
        </Modal>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="login-container">
        <div className="brand-section">
          <img className='logo' src='/logo.webp' alt="logo" />
        </div>
        <Modal onOpen={() => navigate('/')}>
          <div className="form-container">
            <h2>Invalid or Expired Link</h2>
            <p>This password reset link is invalid or has expired.</p>
            <button onClick={() => navigate('/')} className="signBtn">
              Back to Login
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className="login-container">
        <div className="brand-section">
          <img className='logo' src='/logo.webp' alt="logo" />
        </div>
        <Modal onOpen={() => navigate('/')}>
          <div className="form-container">
            <h2>Password Reset Successful!</h2>
            <p>Your password has been reset. Redirecting to login...</p>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="brand-section">
        <img className='logo' src='/logo.webp' alt="logo" />
      </div>
      <Modal onOpen={() => navigate('/')}>
        <form className="form-container" onSubmit={onSubmit}>
          <h2>Reset Your Password</h2>
          <InputField
            type="password"
            placeholder="New Password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required'
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && typeof errors.password.message === 'string' && (
            <span className="error-msg">{errors.password.message}</span>
          )}

          <InputField
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: {
                value: true,
                message: 'Please confirm your password'
              },
              validate: (value) => value === watch('password') || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && (
            <span className="error-msg">{errors.confirmPassword.message}</span>
          )}

          {errorMessage && <span className="error-msg">{errorMessage}</span>}

          <button type="submit" className="signBtn">
            Reset Password
          </button>
        </form>
      </Modal>
    </div>
  );
};
