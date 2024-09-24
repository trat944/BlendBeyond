"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = exports.getReceiverSocketId = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const dislike_routes_1 = __importDefault(require("./routes/dislike.routes"));
const userFiltering_routes_1 = __importDefault(require("./routes/userFiltering.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const conversation_routes_1 = __importDefault(require("./routes/conversation.routes"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
require('dotenv').config();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)({ useTempFiles: true, tempFileDir: './uploads' }));
app.use(express_1.default.json());
app.use("/api/users", user_routes_1.default);
app.use("/api/filteredUsers", userFiltering_routes_1.default);
app.use("/api/likes", like_routes_1.default);
app.use("/api/dislikes", dislike_routes_1.default);
app.use("/api/messages", message_routes_1.default);
app.use("/api/conversations", conversation_routes_1.default);
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [FRONTEND_URL],
        methods: ["GET", "POST", "DELETE", "PATCH"],
        credentials: true
    },
});
exports.io = io;
const getReceiverSocketId = (receiverId) => {
    if (typeof userSocketMap[receiverId] !== 'undefined') {
        return userSocketMap[receiverId];
    }
    else {
        return null;
    }
};
exports.getReceiverSocketId = getReceiverSocketId;
const userSocketMap = {};
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != "undefined")
        userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});
