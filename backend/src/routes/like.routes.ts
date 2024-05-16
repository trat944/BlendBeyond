import { Router } from "express"
import { createLike } from "../controllers/like.controllers";

const likeRouter = Router();

// userRouter.get("/", getAllUsers)
// userRouter.get("/desired", getDesiredUsers)
likeRouter.post("/", createLike)
// userRouter.patch("/config", updateUser)
// userRouter.delete("/:userId", deleteUser)

export default likeRouter;