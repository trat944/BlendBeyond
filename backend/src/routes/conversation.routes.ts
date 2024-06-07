import { Router } from "express"
import authenticateToken from "../middleware/jwtMiddleware";
import { createConversation, deleteConversation, getConversation } from "../controllers/conversation.controllers";

const conversationRouter = Router();

conversationRouter.post('/get/one/:id', authenticateToken, getConversation)
conversationRouter.post('/create/:id', authenticateToken, createConversation)
conversationRouter.delete('/:id', authenticateToken, deleteConversation)


export default conversationRouter;