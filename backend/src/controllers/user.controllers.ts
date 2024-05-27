import { Request, Response } from "express";
import prisma from "../db/client";
import cloudinary, { deleteImage, uploadCoverImg } from "../utils/cloudinaryConfig";
import { error } from "console";
import fs from 'fs-extra'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateTokenAndSetCookie } from "../utils/generateToken";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        likedUsers: true,
        likedBy: true,
        dislikedUsers: true,
        dislikedBy: true
      }
    });
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return res.status(400).send('User already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    if (newUser) {
      console.log('hey')
      generateTokenAndSetCookie(newUser.id, res)
    }

    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        likedBy: true,
        likedUsers: true,
        dislikedBy: true,
        dislikedUsers: true,
      }
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || "");

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    if (!user.likedBy) user.likedBy = [];
    if (!user.likedUsers) user.likedUsers = [];
    if (!user.dislikedBy) user.dislikedBy = [];
    if (!user.dislikedUsers) user.dislikedUsers = [];

    generateTokenAndSetCookie(user.id, res)

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, password, birthdate, city, sex, lookingFor, id, age, pictureId } = req.body;
  const file = req.files?.selfImage;
  try {
    if (file) {
      if (Array.isArray(file)) return res.status(400).send({ message: "File should not be an array" });

      if (pictureId !== null) {
        await deleteImage(pictureId);
      }
      const responsecloud = await uploadCoverImg(file.tempFilePath);
      await prisma.user.update({
        where: { id: id },
        data: { pictureId: responsecloud.public_id, pictureUrl: responsecloud.secure_url }
      });
      await fs.unlink(file.tempFilePath);
    }

    const userUpdated = await prisma.user.update({
      where: { id: id },
      data: { name, email, password, birthdate, city, sex, lookingFor, age }
    });

    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        likedBy: true,
        likedUsers: true,
        dislikedBy: true,
        dislikedUsers: true,
      }
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log('Error in logout controller');
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const {userId} = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const result = await prisma.$transaction(async (prisma) => {
      await prisma.like.deleteMany({
        where: {
          OR: [
            { fromId: userId },
            { toId: userId }
          ]
        }
      });

      await prisma.dislike.deleteMany({
        where: {
          OR: [
            { fromId: userId },
            { toId: userId }
          ]
        }
      });

      const userDeleted = await prisma.user.delete({
        where: { id: userId },
      });

      return userDeleted;
    });

    if (user.pictureId !== null) {
      await deleteImage(user.pictureId);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
