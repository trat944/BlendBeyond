import jwt from 'jsonwebtoken'
import express, { Response } from 'express';

export const generateTokenAndSetCookie = (userId: string, res: Response,) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== 'development',
  });
}