import { Router } from "express"
import { createDislike, deleteDislike } from "../controllers/dislike.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const dislikeRouter = Router();

dislikeRouter.post("/", createDislike)
dislikeRouter.delete("/", deleteDislike)


export default dislikeRouter;