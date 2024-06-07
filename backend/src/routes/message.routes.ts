import { Router } from "express"
import authenticateToken from "../middleware/jwtMiddleware";
import { deleteMessage, getMessages, sendMessage } from "../controllers/message.controllers";

const messageRouter = Router();

messageRouter.post("/send/:id", authenticateToken, sendMessage)
messageRouter.post('/get/:id', authenticateToken, getMessages)
messageRouter.delete('/delete', authenticateToken, deleteMessage)


export default messageRouter;