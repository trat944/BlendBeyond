import { Router } from "express"
import { createUser, deleteUser, getAllUsers, getDesiredUsers, loginUser, updateUser } from "../controllers/user.controllers";

const userRouter = Router();

userRouter.get("/", getAllUsers)
userRouter.post("/desired", getDesiredUsers)
userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.patch("/config", updateUser)
userRouter.delete("/:userId", deleteUser)

export default userRouter;