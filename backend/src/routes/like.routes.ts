import { Router } from "express"
import { createLike } from "../controllers/like.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const likeRouter = Router();

likeRouter.post("/", authenticateToken, createLike)


export default likeRouter;