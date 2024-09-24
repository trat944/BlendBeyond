"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dislike_controllers_1 = require("../controllers/dislike.controllers");
const jwtMiddleware_1 = __importDefault(require("../middleware/jwtMiddleware"));
const dislikeRouter = (0, express_1.Router)();
dislikeRouter.post("/", jwtMiddleware_1.default, dislike_controllers_1.createDislike);
dislikeRouter.delete("/", jwtMiddleware_1.default, dislike_controllers_1.deleteDislike);
exports.default = dislikeRouter;
