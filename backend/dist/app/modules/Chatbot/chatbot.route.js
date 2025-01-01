"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const chatbot_controller_1 = require("./chatbot.controller");
const router = express_1.default.Router();
// Save a chat message
router.post("/", chatbot_controller_1.ChatBotController.chat);
// Get chat history
// router.get("/", auth(UserRole.CUSTOMER), ChatBotController.getChatHistory);
exports.ChatBotRoutes = router;
