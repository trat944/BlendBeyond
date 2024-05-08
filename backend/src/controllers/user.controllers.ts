import { Request, Response } from "express";
import prisma from "../db/client";
import { uploadCoverImg } from "../utils/cloudinaryConfig";
import { error } from "console";
import fs from 'fs-extra'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data:{ name, email, password }
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, password, birthdate, id } = req.body;
  const file = req.files?.selfImage;
  try {
    if (file) {
      if (Array.isArray(file)) return res.status(400)
      else {
        const responsecloud = await uploadCoverImg(file.tempFilePath)
        console.log(responsecloud)
        const userUpdated = await prisma.user.update({
          where: {id: id},
          data:{pictureId: responsecloud.public_id, pictureUrl: responsecloud.secure_url}
        })
        await fs.unlink(file.tempFilePath)
      }
    }
    const userUpdated = await prisma.user.update({
      where: {id: id},
      data:{name, email, password, birthdate}
    })
    res.status(201).send(userUpdated)
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userDeleted = await prisma.user.delete({ 
     where: { id: userId}
    })
    res.status(200).send(userDeleted)
  } catch (error) {
    res.status(400).send(error)
  }

};
