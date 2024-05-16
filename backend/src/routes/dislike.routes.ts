import { Router } from "express"
import { createDislike } from "../controllers/dislike.controllers";

const dislikeRouter = Router();

// userRouter.get("/", getAllUsers)
// userRouter.get("/desired", getDesiredUsers)
dislikeRouter.post("/", createDislike)
// likeRouter.post("/dislikes", createDislike)
// userRouter.patch("/config", updateUser)
// userRouter.delete("/:userId", deleteUser)

export default dislikeRouter;