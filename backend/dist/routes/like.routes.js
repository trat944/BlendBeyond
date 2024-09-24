"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const like_controllers_1 = require("../controllers/like.controllers");
const jwtMiddleware_1 = __importDefault(require("../middleware/jwtMiddleware"));
const likeRouter = (0, express_1.Router)();
likeRouter.post("/", jwtMiddleware_1.default, like_controllers_1.createLike);
likeRouter.delete("/", jwtMiddleware_1.default, like_controllers_1.deleteLike);
exports.default = likeRouter;
