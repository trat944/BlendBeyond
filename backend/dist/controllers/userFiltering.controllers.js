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
exports.getUsersWithConversations = exports.getMatchedUsersWithoutConversationOpen = exports.getDesiredUsers = void 0;
const client_1 = __importDefault(require("../db/client"));
const getDesiredUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, lookingFor, sex, likedUsers, dislikedUsers } = req.body;
    if (!city || !lookingFor || !sex || !likedUsers || !dislikedUsers) {
        return res.status(400).send("Missing required parameters");
    }
    const likedUserIds = likedUsers.map((like) => like.toId);
    const dislikedUserIds = dislikedUsers.map((dislike) => dislike.toId);
    try {
        const desiredUsers = yield client_1.default.user.findMany({
            where: {
                city,
                sex: lookingFor,
                lookingFor: sex,
                id: {
                    notIn: [...likedUserIds, ...dislikedUserIds],
                },
            },
        });
        res.status(200).send(desiredUsers);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.getDesiredUsers = getDesiredUsers;
const getMatchedUsersWithoutConversationOpen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, likedUsers, likedBy } = req.body;
    try {
        if (!likedUsers || !likedBy) {
            return res.status(400).send("Missing people you liked or people that like you");
        }
        const likedUserIds = likedUsers.map((like) => like.toId);
        const usersThatLikeUser = likedBy.map((like) => like.fromId);
        const matchedUsers = [];
        usersThatLikeUser.forEach((userId) => {
            if (likedUserIds.includes(userId)) {
                matchedUsers.push(userId);
            }
        });
        const conversations = yield client_1.default.conversation.findMany({
            where: {
                OR: [
                    { participant1Id: id },
                    { participant2Id: id },
                ],
            },
            select: {
                participant1Id: true,
                participant2Id: true,
            },
        });
        const participantsInConversations = new Set();
        conversations.forEach((conversation) => {
            participantsInConversations.add(conversation.participant1Id);
            participantsInConversations.add(conversation.participant2Id);
        });
        const filteredMatchedUsers = matchedUsers.filter(userId => !participantsInConversations.has(userId));
        const matchedFound = yield client_1.default.user.findMany({
            where: {
                id: {
                    in: filteredMatchedUsers,
                },
            },
        });
        res.status(200).send(matchedFound);
    }
    catch (error) {
        console.error('Error getting matched users', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getMatchedUsersWithoutConversationOpen = getMatchedUsersWithoutConversationOpen;
const getUsersWithConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: senderId } = req.params;
        const conversations = yield client_1.default.conversation.findMany({
            where: {
                OR: [
                    { participant1Id: senderId },
                    { participant2Id: senderId },
                ]
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            }
        });
        if (!conversations || conversations.length === 0) {
            return res.status(404).json({ error: 'No conversations found' });
        }
        const usersWithLastMessage = yield Promise.all(conversations.map((conversation) => __awaiter(void 0, void 0, void 0, function* () {
            const participantId = conversation.participant1Id === senderId ? conversation.participant2Id : conversation.participant1Id;
            const user = yield client_1.default.user.findUnique({
                where: { id: participantId },
                select: {
                    id: true,
                    name: true,
                    age: true,
                    pictureUrl: true
                }
            });
            return {
                conversationId: conversation.id,
                user,
                lastMessage: conversation.messages[0]
            };
        })));
        res.status(200).json(usersWithLastMessage);
    }
    catch (error) {
        console.error('Error getting users with conversations', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getUsersWithConversations = getUsersWithConversations;
