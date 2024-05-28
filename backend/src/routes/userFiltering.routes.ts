import { Router } from "express"
import { getDesiredUsers, getMatchedUsers } from "../controllers/userFiltering.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const userFilteringRouter = Router();

userFilteringRouter.post("/desired", getDesiredUsers)
userFilteringRouter.post("/matched", getMatchedUsers)

export default userFilteringRouter;