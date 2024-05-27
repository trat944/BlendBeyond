import { Request, Response } from "express";
import prisma from "../db/client";

export const sendMessage = async (req: Request, res: Response) => {

  try {
    console.log('message sent')
    res.status(201).json();
  } catch (error) {
    return res.status(400).send("Failed to create dislike");
  }
};