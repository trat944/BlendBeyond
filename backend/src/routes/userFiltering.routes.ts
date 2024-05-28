import { Router } from "express"
import { getDesiredUsers, getMatchedUsersWithoutConversationOpen } from "../controllers/userFiltering.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const userFilteringRouter = Router();

userFilteringRouter.post("/desired", getDesiredUsers)
userFilteringRouter.post("/matched", getMatchedUsersWithoutConversationOpen)

export default userFilteringRouter;