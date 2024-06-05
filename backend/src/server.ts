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
// import { app } from './sockets/socket';
import { Server } from 'socket.io';
import http from 'http';

require('dotenv').config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: './uploads' }));
app.use(express.json());

// Rutas de la API
app.use("/users", userRouter);
app.use("/filteredUsers", userFilteringRouter);
app.use("/likes", likeRouter);
app.use("/dislikes", dislikeRouter);
app.use("/messages", messageRouter);
app.use("/conversations", conversationRouter);

// Configuración del servidor HTTP y Socket.io
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST", "DELETE"],
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
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId as string;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
    if (userId) { // Check if userId is not undefined before using it
      console.log("user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
    // ... rest of the code
  });
})


export { app, io, server };
