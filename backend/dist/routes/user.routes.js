"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const jwtMiddleware_1 = __importDefault(require("../middleware/jwtMiddleware"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_controllers_1.getAllUsers);
userRouter.post("/", user_controllers_1.createUser);
userRouter.post("/login", user_controllers_1.loginUser);
userRouter.post('/logout', jwtMiddleware_1.default, user_controllers_1.logoutUser);
userRouter.patch("/config", jwtMiddleware_1.default, user_controllers_1.updateUser);
userRouter.delete("/", jwtMiddleware_1.default, user_controllers_1.deleteUser);
exports.default = userRouter;
