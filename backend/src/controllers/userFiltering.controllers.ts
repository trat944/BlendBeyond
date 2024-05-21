import { Request, Response } from "express";
import prisma from "../db/client";
import cloudinary, { deleteImage, uploadCoverImg } from "../utils/cloudinaryConfig";
import { error } from "console";
import fs from 'fs-extra'
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";

export const getDesiredUsers = async (req: Request, res: Response) => {
  const { city, lookingFor, sex, likedUsers, dislikedUsers } = req.body;

  if (!city || !lookingFor || !sex || !likedUsers || !dislikedUsers) {
    return res.status(400).send("Missing required parameters");
  }

  const likedUserIds = likedUsers.map((like: any) => like.toId);
  const dislikedUserIds = dislikedUsers.map((dislike: any) => dislike.toId);

  try {
    const desiredUsers = await prisma.user.findMany({
      where: {
        city,
        sex: lookingFor,
        lookingFor: sex,
        id: {
          notIn: [...likedUserIds, ...dislikedUserIds], 
        },
      },
    });
    res.status(200).send(desiredUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getMatchedUsers = async (req: Request, res: Response) => {
  const { likedUsers, likedBy } = req.body;

  if (!likedUsers || !likedBy) {
    return res.status(400).send("Missing people you liked or people that like you");
  }
  const likedUserIds = likedUsers.map((like: any) => like.toId);
  const usersThatLikeUser: string[] = likedBy.map((like: any) => like.fromId);
  const matchedUsers: string[] = [];
  usersThatLikeUser.forEach((id:string) => {
    if (likedUserIds.includes(id)) {
      matchedUsers.push(id)
    }
  })
  try {
    const matchedFound = await prisma.user.findMany({
      where: {
        id: {
          in: matchedUsers,
        },
      },
    });
    res.status(200).send(matchedFound);
  } catch (error) {
    res.status(400).send(error);
  }
};