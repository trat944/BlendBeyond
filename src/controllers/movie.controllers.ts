import { Request, Response } from "express";
import MovieModel from "../models/movie.model";
import UserModel from "../models/user.model";

export const createMovie = async (req: Request, res: Response) => {
  const { name, image } = req.body;
  const { userId } = req.params;
  try {
    const movie = await MovieModel.create({ name, image });
    await UserModel.findByIdAndUpdate(
        { _id: userId }, 
        { $push: {movies: movie._id}});
        
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await MovieModel.find();
    res.status(201).send(allMovies);
  } catch (error) {
    res.status(400).send(error);
  }
};
