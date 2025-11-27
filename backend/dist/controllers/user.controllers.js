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
exports.deleteUser = exports.logoutUser = exports.updateUser = exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const client_1 = __importDefault(require("../db/client"));
const cloudinaryConfig_1 = require("../utils/cloudinaryConfig");
const fs_extra_1 = __importDefault(require("fs-extra"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield client_1.default.user.findMany({
            include: {
                likedUsers: true,
                likedBy: true,
                dislikedUsers: true,
                dislikedBy: true
            }
        });
        res.status(200).send(allUsers);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield client_1.default.user.findUnique({
            where: { email },
        });
        if (user) {
            return res.status(400).send('User already exists');
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield client_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        if (newUser) {
            (0, generateToken_1.generateTokenAndSetCookie)(newUser.id, res);
        }
        res.status(201).send(newUser);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield client_1.default.user.findUnique({
            where: { email },
            include: {
                likedBy: true,
                likedUsers: true,
                dislikedBy: true,
                dislikedUsers: true,
            }
        });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password || "");
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        if (!user.likedBy)
            user.likedBy = [];
        if (!user.likedUsers)
            user.likedUsers = [];
        if (!user.dislikedBy)
            user.dislikedBy = [];
        if (!user.dislikedUsers)
            user.dislikedUsers = [];
        (0, generateToken_1.generateTokenAndSetCookie)(user.id, res);
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { name, email, password, birthdate, city, sex, lookingFor, id, age, pictureId } = req.body;
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.selfImage;
    try {
        if (file) {
            if (Array.isArray(file))
                return res.status(400).send({ message: "File should not be an array" });
            if (pictureId !== null) {
                yield (0, cloudinaryConfig_1.deleteImage)(pictureId);
            }
            const responsecloud = yield (0, cloudinaryConfig_1.uploadCoverImg)(file.tempFilePath);
            yield client_1.default.user.update({
                where: { id: id },
                data: { pictureId: responsecloud.public_id, pictureUrl: responsecloud.secure_url }
            });
            yield fs_extra_1.default.unlink(file.tempFilePath);
        }
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (email !== undefined)
            updateData.email = email;
        if (password !== undefined)
            updateData.password = password;
        if (birthdate !== null)
            updateData.birthdate = birthdate;
        if (city !== null)
            updateData.city = city;
        if (sex !== null || sex !== 'select')
            updateData.sex = sex;
        if (lookingFor !== null || lookingFor !== 'select')
            updateData.lookingFor = lookingFor;
        if (age !== null)
            updateData.age = age;
        const userUpdated = yield client_1.default.user.update({
            where: { id: id },
            data: updateData
        });
        const user = yield client_1.default.user.findUnique({
            where: { id: id },
            include: {
                likedBy: true,
                likedUsers: true,
                dislikedBy: true,
                dislikedUsers: true,
            }
        });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});
exports.updateUser = updateUser;
const logoutUser = (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log('Error in logout controller');
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.logoutUser = logoutUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const user = yield client_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const result = yield client_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.like.deleteMany({
                where: {
                    OR: [
                        { fromId: userId },
                        { toId: userId }
                    ]
                }
            });
            yield prisma.dislike.deleteMany({
                where: {
                    OR: [
                        { fromId: userId },
                        { toId: userId }
                    ]
                }
            });
            yield prisma.conversation.deleteMany({
                where: {
                    OR: [
                        { participant1Id: userId },
                        { participant2Id: userId }
                    ]
                }
            });
            yield prisma.message.deleteMany({
                where: {
                    OR: [
                        { senderId: userId },
                        { receiverId: userId }
                    ]
                }
            });
            const userDeleted = yield prisma.user.delete({
                where: { id: userId },
            });
            return userDeleted;
        }));
        if (user.pictureId !== null) {
            yield (0, cloudinaryConfig_1.deleteImage)(user.pictureId);
        }
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
