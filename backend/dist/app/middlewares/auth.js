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
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            console.log("Authorization Header:", authHeader); // Log the received header for debugging
            // Check if Authorization header exists
            if (!authHeader) {
                throw new ApiError_1.default(401, "Unauthorized: Missing Authorization header.");
            }
            // Extract token (removing 'Bearer ' prefix)
            const token = authHeader.startsWith("Bearer ")
                ? authHeader.slice(7)
                : authHeader;
            console.log("Extracted Token:", token); // Log the extracted token for debugging
            // Verify token
            const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
            if (!verifiedUser) {
                throw new ApiError_1.default(401, "Invalid token or verification failed.");
            }
            console.log("Verified User:", verifiedUser);
            // Attach user to request object
            req.user = verifiedUser;
            // Role validation
            if (roles.length &&
                (!verifiedUser.role || !roles.includes(verifiedUser.role))) {
                throw new ApiError_1.default(403, "Forbidden: You do not have the required permissions.");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = auth;
