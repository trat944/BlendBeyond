"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.sendMessage = exports.getMessages = void 0;
const client_1 = __importDefault(require("../db/client"));
const server_1 = require("../server");
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { receiverId } = req.body;
        const { id: senderId } = req.params;
        const conversation = yield client_1.default.conversation.findFirst({
            where: {
                OR: [
                    {
                        participant1Id: senderId,
                        participant2Id: receiverId,
                    },
                    {
                        participant1Id: receiverId,
                        participant2Id: senderId,
                    }
                ]
            },
            include: {
                messages: true,
            }
        });
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json(conversation.messages);
    }
    catch (error) {
        console.error('Error getting messages', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getMessages = getMessages;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, receiverId } = req.body;
        const { id: senderId } = req.params;
        // Encuentra la conversación existente entre los dos usuarios
        const conversation = yield client_1.default.conversation.findFirst({
            where: {
                OR: [
                    { participant1Id: senderId, participant2Id: receiverId },
                    { participant1Id: receiverId, participant2Id: senderId }
                ]
            },
            include: {
                messages: true,
            }
        });
        let conversationId;
        if (conversation) {
            // Si la conversación ya existe, usa su ID
            conversationId = conversation.id;
        }
        else {
            // Si la conversación no existe, créala
            const conversation = yield client_1.default.conversation.create({
                data: {
                    participant1: { connect: { id: senderId } },
                    participant2: { connect: { id: receiverId } }
                }
            });
            conversationId = conversation.id;
        }
        // Crea el nuevo mensaje en la conversación
        const newMessage = yield client_1.default.message.create({
            data: {
                senderId,
                receiverId,
                message,
                conversationId,
            }
        });
        const receiverSocketId = (0, server_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            server_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error('Error sending message', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.sendMessage = sendMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.body;
    if (!messageId) {
        return res.status(400).send("Invalid id parameter");
    }
    try {
        yield client_1.default.message.delete({
            where: { id: messageId },
        });
        res.status(200).send("Message deleted successfully");
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Failed to delete message");
    }
});
exports.deleteMessage = deleteMessage;
