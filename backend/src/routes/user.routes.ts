import { Router } from "express"
import { createUser, deleteUser, getAllUsers, loginUser, updateUser } from "../controllers/user.controllers";
import { getDesiredUsers } from "../controllers/userFiltering.controllers";

const userRouter = Router();

userRouter.get("/", getAllUsers)
userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.patch("/config", updateUser)
userRouter.delete("/", deleteUser)

export default userRouter;