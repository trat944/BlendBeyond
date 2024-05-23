import { Router } from "express"
import { createDislike } from "../controllers/dislike.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const dislikeRouter = Router();

dislikeRouter.post("/", authenticateToken, createDislike)


export default dislikeRouter;