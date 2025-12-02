import nodemailer from 'nodemailer';
import config from '../config/config';

console.log('Email config:', {
  user: config.email.USER,
  hasPassword: !!config.email.PASSWORD,
  passwordLength: config.email.PASSWORD?.length
});

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.USER,
    pass: config.email.PASSWORD
  }
});

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  const resetUrl = `${config.frontend.URL}/reset-password/${resetToken}`;
  
  console.log('Attempting to send email to:', email);
  console.log('Reset URL:', resetUrl);
  
  const mailOptions = {
    from: config.email.USER,
    to: email,
    subject: 'Password Reset - BlendBeyond',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested to reset your password for BlendBeyond.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Reset Password
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #007bff;">${resetUrl}</p>
        <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
        <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  try {
    console.log('Sending email with options:', { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject });
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Failed to send reset email');
  }
};
