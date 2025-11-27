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
exports.deleteConversation = exports.createConversation = exports.getConversation = void 0;
const client_1 = __importDefault(require("../db/client"));
const getConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { participant2 } = req.body;
        const { id: participant1 } = req.params;
        const conversation = yield client_1.default.conversation.findFirst({
            where: {
                OR: [
                    {
                        participant1Id: participant1,
                        participant2Id: participant2,
                    },
                    {
                        participant1Id: participant2,
                        participant2Id: participant1,
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
        res.status(200).json(conversation);
    }
    catch (error) {
        console.error('Error getting messages', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getConversation = getConversation;
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { participant2 } = req.body;
        const { id: participant1 } = req.params;
        const newConversation = yield client_1.default.conversation.create({
            data: {
                participant1: { connect: { id: participant2 } },
                participant2: { connect: { id: participant1 } }
            }
        });
        res.status(200).json(newConversation);
    }
    catch (error) {
        console.error('Error creating conversation', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createConversation = createConversation;
const deleteConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: conversationId } = req.params;
        const conversation = yield client_1.default.conversation.findUnique({ where: { id: conversationId } });
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        const deleteMessages = yield client_1.default.message.deleteMany({
            where: {
                conversationId: conversationId
            }
        });
        const deletedConversation = yield client_1.default.conversation.delete(({
            where: { id: conversation.id },
        }));
        res.status(200).json(conversation);
    }
    catch (error) {
        console.error('Error getting messages', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteConversation = deleteConversation;
