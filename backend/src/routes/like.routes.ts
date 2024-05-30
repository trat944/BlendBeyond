import { Router } from "express"
import { createLike, deleteLike } from "../controllers/like.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const likeRouter = Router();

likeRouter.post("/", createLike)
likeRouter.delete("/", deleteLike)


export default likeRouter;