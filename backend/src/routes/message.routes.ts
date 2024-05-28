import { Router } from "express"
import authenticateToken from "../middleware/jwtMiddleware";
import { getMessages, sendMessage } from "../controllers/message.controllers";

const messageRouter = Router();

messageRouter.post("/send/:id", sendMessage)
messageRouter.post('/get/:id', getMessages)


export default messageRouter;