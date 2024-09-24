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
exports.deleteDislike = exports.createDislike = void 0;
const client_1 = __importDefault(require("../db/client"));
const createDislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromUserId, toUserId } = req.body;
    if (!fromUserId || !toUserId) {
        return res.status(400).send("Invalid id parameters");
    }
    try {
        const newDislike = yield client_1.default.dislike.create({
            data: {
                from: { connect: { id: fromUserId } }, // User giving the dislike
                to: { connect: { id: toUserId } } // User receiving the dislike
            }
        });
        res.status(201).json(newDislike);
    }
    catch (error) {
        return res.status(400).send("Failed to create dislike");
    }
});
exports.createDislike = createDislike;
const deleteDislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dislikeId } = req.body;
    if (!dislikeId) {
        return res.status(400).send("Invalid id parameter");
    }
    try {
        yield client_1.default.dislike.delete({
            where: { id: dislikeId },
        });
        res.status(200).send("Like deleted successfully");
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Failed to delete like");
    }
});
exports.deleteDislike = deleteDislike;
