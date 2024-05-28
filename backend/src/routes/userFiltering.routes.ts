import { Router } from "express"
import { getDesiredUsers, getMatchedUsersWithoutConversationOpen, getUsersWithConversations } from "../controllers/userFiltering.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const userFilteringRouter = Router();

userFilteringRouter.post("/desired", getDesiredUsers)
userFilteringRouter.post("/matched", getMatchedUsersWithoutConversationOpen)
userFilteringRouter.get('/get/:id', getUsersWithConversations)

export default userFilteringRouter;