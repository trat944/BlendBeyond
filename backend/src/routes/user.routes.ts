import { Router } from "express"
import { createUser, deleteUser, getAllUsers, loginUser, logoutUser, updateUser } from "../controllers/user.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const userRouter = Router();

userRouter.get("/", getAllUsers)
userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.post('/logout', authenticateToken, logoutUser);
userRouter.patch("/config", authenticateToken, updateUser)
userRouter.delete("/", authenticateToken, deleteUser)

export default userRouter;