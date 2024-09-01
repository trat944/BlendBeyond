import express from 'express'
import userRouter from './routes/user.routes';
import likeRouter from './routes/like.routes';
import dislikeRouter from './routes/dislike.routes';
import userFilteringRouter from './routes/userFiltering.routes';
import messageRouter from './routes/message.routes';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import conversationRouter from './routes/conversation.routes';
import { Server } from 'socket.io';
import http from 'http';

require('dotenv').config();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true
}));

app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: './uploads' }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/filteredUsers", userFilteringRouter);
app.use("/api/likes", likeRouter);
app.use("/api/dislikes", dislikeRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversations", conversationRouter);

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: [FRONTEND_URL],
		methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
	},
});

export const getReceiverSocketId = (receiverId: string) => { 
  if (typeof userSocketMap[receiverId] !== 'undefined') {
    return userSocketMap[receiverId];
  } else {
    return null; 
  }
};

const userSocketMap: { [userId: string]: string } = {};

io.on("connection", (socket) => {

	const userId = socket.handshake.query.userId as string;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
    if (userId) { 
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
})


export { app, io, server };
