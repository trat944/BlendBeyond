"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userFiltering_controllers_1 = require("../controllers/userFiltering.controllers");
const jwtMiddleware_1 = __importDefault(require("../middleware/jwtMiddleware"));
const userFilteringRouter = (0, express_1.Router)();
userFilteringRouter.post("/desired", jwtMiddleware_1.default, userFiltering_controllers_1.getDesiredUsers);
userFilteringRouter.post("/matched", jwtMiddleware_1.default, userFiltering_controllers_1.getMatchedUsersWithoutConversationOpen);
userFilteringRouter.get('/get/:id', jwtMiddleware_1.default, userFiltering_controllers_1.getUsersWithConversations);
exports.default = userFilteringRouter;
