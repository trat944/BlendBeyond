import { Router } from "express"
import { getDesiredUsers, getMatchedUsers } from "../controllers/userFiltering.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const userFilteringRouter = Router();

userFilteringRouter.post("/desired", authenticateToken, getDesiredUsers)
userFilteringRouter.post("/matched", authenticateToken, getMatchedUsers)

export default userFilteringRouter;