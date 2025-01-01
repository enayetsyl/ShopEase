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
exports.ChatBotServices = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
// Initialize the Gemini API
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.default.GEMINI_API_KEY);
// Initialize conversation history with system instructions
let conversationHistory = [
    {
        role: "user",
        parts: [
            {
                text: "You are a helpful shopping assistant. Your job is to assist users with their shopping-related questions, such as product recommendations, price comparisons, and store locations. Be friendly, informative, and concise.",
            },
        ],
    },
    {
        role: "model",
        parts: [
            {
                text: "Sure! How can I assist you with shopping today?",
            },
        ],
    },
];
const chat = (userPrompt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userPrompt)
        throw new ApiError_1.default(400, "User prompt is required.");
    try {
        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Start the chat session with current history
        const chatSession = model.startChat({
            history: conversationHistory, // Send full conversation history
        });
        // Send the user message
        const result = yield chatSession.sendMessage(userPrompt);
        // Validate the response
        if (!result || !result.response || !result.response.text) {
            throw new ApiError_1.default(500, "Failed to get a valid response from the model.");
        }
        // Extract the model's response
        const modelResponse = result.response.text();
        // Append the new user input and model response to conversation history
        conversationHistory.push({
            role: "user",
            parts: [{ text: userPrompt }],
        });
        conversationHistory.push({
            role: "model",
            parts: [{ text: modelResponse }],
        });
        console.log('Conversation chat history', conversationHistory);
        return modelResponse;
    }
    catch (error) {
        console.error("Error in chat function:", error);
        throw new ApiError_1.default(500, "An error occurred while processing the chat.");
    }
});
const getChatHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.ChatBotServices = {
    chat, getChatHistory
};
