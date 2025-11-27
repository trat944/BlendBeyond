"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define el tipo del middleware utilizando los tipos de Express
const authenticateToken = (req, res, next) => {
    const token = req.cookies['jwt'];
    if (!token) {
        return res.sendStatus(401);
    }
    const secret = process.env.JWT_SECRET;
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
exports.default = authenticateToken;
