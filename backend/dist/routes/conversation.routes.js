"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = __importDefault(require("../middleware/jwtMiddleware"));
const conversation_controllers_1 = require("../controllers/conversation.controllers");
const conversationRouter = (0, express_1.Router)();
conversationRouter.post('/get/one/:id', jwtMiddleware_1.default, conversation_controllers_1.getConversation);
conversationRouter.post('/create/:id', jwtMiddleware_1.default, conversation_controllers_1.createConversation);
conversationRouter.delete('/:id', jwtMiddleware_1.default, conversation_controllers_1.deleteConversation);
exports.default = conversationRouter;
