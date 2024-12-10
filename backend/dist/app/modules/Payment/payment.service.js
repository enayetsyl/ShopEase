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
exports.PaymentServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../../config"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY);
const createPaymentIntent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //  upload file to cloudinary
    // save data into db
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: data.amount * 100,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    return paymentIntent;
});
const savePaymentInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, status } = data;
    return yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        // Step 1: Save the payment info
        const payment = yield prisma.payment.create({
            data: data,
        });
        // Step 2: If payment is successful, update the order status and link the payment
        if (status === "SUCCESS") {
            // Update order status and link payment
            const order = yield prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: "COMPLETED",
                    payment: {
                        connect: { id: payment.id },
                    },
                },
                include: {
                    order_items: true,
                },
            });
            // Step 3: Reduce inventory for each product in the order
            for (const orderItem of order.order_items) {
                const { productId, quantity } = orderItem;
                // Reduce the inventory of the product
                yield prisma.product.update({
                    where: {
                        id: productId,
                    },
                    data: {
                        inventory: {
                            decrement: quantity,
                        },
                    },
                });
            }
        }
        return payment;
    }));
});
const getAllTransactions = (options, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const result = yield prisma_1.default.payment.findMany({
        where: { status: "SUCCESS" },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.payment.count({
        where: { status: "SUCCESS" }
    });
    return {
        data: result,
        meta: { page, limit, total },
    };
});
exports.PaymentServices = {
    createPaymentIntent, savePaymentInfo, getAllTransactions
};
