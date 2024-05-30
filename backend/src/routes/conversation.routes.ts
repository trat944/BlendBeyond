import { Router } from "express"
import authenticateToken from "../middleware/jwtMiddleware";
import { createConversation, deleteConversation, getConversation } from "../controllers/conversation.controllers";

const conversationRouter = Router();

conversationRouter.post('/get/one/:id', getConversation)
conversationRouter.post('/create/:id', createConversation)
conversationRouter.delete('/:id', deleteConversation)


export default conversationRouter;