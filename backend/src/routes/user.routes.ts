import { Router } from "express"
import { createUser, deleteUser, getAllUsers, loginUser, updateUser } from "../controllers/user.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const userRouter = Router();

userRouter.get("/",authenticateToken, getAllUsers)
userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.patch("/config", authenticateToken, updateUser)
userRouter.delete("/", authenticateToken, deleteUser)

export default userRouter;