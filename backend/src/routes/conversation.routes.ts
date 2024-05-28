import { Router } from "express"
import authenticateToken from "../middleware/jwtMiddleware";
import { deleteConversation, getConversation } from "../controllers/conversation.controllers";

const conversationRouter = Router();

conversationRouter.post('/get/one/:id', getConversation)
conversationRouter.delete('/:id', deleteConversation)


export default conversationRouter;