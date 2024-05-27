import { Router } from "express"
import authenticateToken from "../middleware/jwtMiddleware";
import { sendMessage } from "../controllers/message.controllers";

const messageRouter = Router();

messageRouter.post("/send/:id", sendMessage)


export default messageRouter;