import { Request, Response } from "express";
import prisma from "../db/client";
import { error } from "console";

export const createLike = async (req: Request, res: Response) => {
    const { fromUserId, toUserId } = req.body;
    console.log(fromUserId)
    console.log(toUserId)
  
    if (!fromUserId || !toUserId) {
        return res.status(400).send("Invalid id parameters");
    }
  
    try {
      const newLike = await prisma.like.create({
        data: {
          from: { connect: { id: fromUserId } }, // User giving the like
          to: { connect: { id: toUserId  } }      // User receiving the like
        }
      });
      res.status(201).json(newLike);
    } catch (error) {
        return res.status(400).send("Failed to create like");
    }
  };

  // export const createDislike = async (req: Request, res: Response) => {
  //   const { fromUserId, toUserId } = req.body;
  
  //   if (!fromUserId || !toUserId) {
  //     return res.status(400).send("Invalid id parameters");
  //   }
  
  //   try {
  //     const newDislike = await prisma.dislike.create({
  //       data: {
  //         from: { connect: { id: fromUserId } }, // User giving the dislike
  //         to: { connect: { id: toUserId } }      // User receiving the dislike
  //       }
  //     });
  //     res.status(201).json(newDislike);
  //   } catch (error) {
  //     return res.status(400).send("Failed to create dislike");
  //   }
  // };