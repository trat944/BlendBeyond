// import { Server } from 'socket.io';
// import http from 'http';
// import express from 'express';
// import cors from 'cors';

// const app = express();

// app.use(cors({
//   origin: ["http://localhost:5173"],
//   methods: ["GET", "POST"],
//   credentials: true
// }));

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log("a user is connected", socket.id);

//   socket.on("disconnect", () => {
//     console.log("a user disconnected", socket.id);
//   });
// });

// export { app, io, server };