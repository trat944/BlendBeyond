import { Router } from "express"
import { createLike, deleteLike } from "../controllers/like.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const likeRouter = Router();

likeRouter.post("/", authenticateToken, createLike)
likeRouter.delete("/", authenticateToken, deleteLike)


export default likeRouter;