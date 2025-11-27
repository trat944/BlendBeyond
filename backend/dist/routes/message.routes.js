"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = __importDefault(require("../middleware/jwtMiddleware"));
const message_controllers_1 = require("../controllers/message.controllers");
const messageRouter = (0, express_1.Router)();
messageRouter.post("/send/:id", jwtMiddleware_1.default, message_controllers_1.sendMessage);
messageRouter.post('/get/:id', jwtMiddleware_1.default, message_controllers_1.getMessages);
messageRouter.delete('/delete', jwtMiddleware_1.default, message_controllers_1.deleteMessage);
exports.default = messageRouter;
