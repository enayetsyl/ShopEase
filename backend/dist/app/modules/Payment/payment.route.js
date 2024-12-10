"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_validation_1 = require("./payment.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create-payment-intent", (0, validateRequest_1.default)(payment_validation_1.paymentValidation.createPaymentIntent), payment_controller_1.PaymentController.createPaymentIntent);
router.post("/payment-confirm", (0, validateRequest_1.default)(payment_validation_1.paymentValidation.confirmPayment), payment_controller_1.PaymentController.paymentConfirm);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), payment_controller_1.PaymentController.getAllTransactions);
exports.PaymentRoutes = router;
