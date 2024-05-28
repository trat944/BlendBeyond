import { Router } from "express"
import authenticateToken from "../middleware/jwtMiddleware";
import { deleteConversation, getConversations } from "../controllers/conversation.controllers";

const conversationRouter = Router();

conversationRouter.get('/get/:id', getConversations)
conversationRouter.delete('/:id', deleteConversation)


export default conversationRouter;