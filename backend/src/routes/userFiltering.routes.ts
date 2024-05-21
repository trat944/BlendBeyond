import { Router } from "express"
import { createUser, deleteUser, getAllUsers, loginUser, updateUser } from "../controllers/user.controllers";
import { getDesiredUsers, getMatchedUsers } from "../controllers/userFiltering.controllers";

const userFilteringRouter = Router();

userFilteringRouter.post("/desired", getDesiredUsers)
userFilteringRouter.post("/matched", getMatchedUsers)

export default userFilteringRouter;