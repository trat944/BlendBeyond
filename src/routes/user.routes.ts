import { Router } from "express"
import { createUser, deleteUser, getAllUser, updateUser } from "../controllers/user.controllers";

const userRouter = Router();

userRouter.get("/", getAllUser)
userRouter.post("/", createUser)
userRouter.patch("/", updateUser)
userRouter.delete("/:userId", deleteUser)

export default userRouter;