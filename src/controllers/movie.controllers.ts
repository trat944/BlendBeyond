import { Request, Response } from "express";
import MovieModel from "../models/movie.model";
import UserModel from "../models/user.model";
import prisma from "../db/client";

export const createMovie = async (req: Request, res: Response) => {
  const { name, image } = req.body;
  const { userId } = req.params;
  try {
    const movie = await prisma.movies.create({
      data:{ name, image, user: { connect : {id:userId}} }
    });     
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await prisma.movies.findMany();
    res.status(201).send(allMovies);
  } catch (error) {
    res.status(400).send(error);
  }
};
