import { Router } from "express"
import { getDesiredUsers, getMatchedUsersWithoutConversationOpen, getUsersWithConversations } from "../controllers/userFiltering.controllers";
import authenticateToken from "../middleware/jwtMiddleware";

const userFilteringRouter = Router();

userFilteringRouter.post("/desired", authenticateToken, getDesiredUsers)
userFilteringRouter.post("/matched", authenticateToken, getMatchedUsersWithoutConversationOpen)
userFilteringRouter.get('/get/:id', authenticateToken, getUsersWithConversations)

export default userFilteringRouter;