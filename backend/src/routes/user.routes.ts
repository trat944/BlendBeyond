import { Router } from "express"
import { createUser, deleteUser, getAllUsers, loginUser, logoutUser, updateUser } from "../controllers/user.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const userRouter = Router();

userRouter.get("/", getAllUsers)
userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.post('/logout', logoutUser);
userRouter.patch("/config", updateUser)
userRouter.delete("/", deleteUser)

export default userRouter;