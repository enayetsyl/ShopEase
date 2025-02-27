"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// CORS configuration
const allowedOrigins = [
    "http://localhost:3000",
    "https://shop-ease-8a83-fe.vercel.app"
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin || "")) {
            callback(null, origin);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    // credentials: true, // Allow credentials (cookies, auth headers)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send({
        Message: "ShopEase server is running correctly",
    });
});
app.use("/api/v1", routes_1.default);
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});
exports.default = app;
