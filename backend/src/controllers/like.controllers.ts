import { Request, Response } from "express";
import prisma from "../db/client";

export const createLike = async (req: Request, res: Response) => {
    const { fromUserId, toUserId } = req.body;
  
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

export const deleteLike = async (req: Request, res: Response) => {
  const { likeId } = req.body;

  if (!likeId) {
    return res.status(400).send("Invalid id parameter");
  }

  try {
    await prisma.like.delete({
      where: { id: likeId },
    });

    res.status(200).send("Like deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to delete like");
  }
};