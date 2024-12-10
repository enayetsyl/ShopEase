"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentValidation = void 0;
const zod_1 = require("zod");
const createPaymentIntent = zod_1.z.object({
    amount: zod_1.z.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
    }).positive("Amount must be greater than zero"),
});
const paymentMetadataSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: "PaymentIntent ID is required",
    }),
    object: zod_1.z.string({
        required_error: "Object type is required",
    }),
    amount: zod_1.z.number({
        required_error: "Amount is required",
    }).positive("Amount must be greater than zero"),
    amount_capturable: zod_1.z.number().nonnegative(),
    amount_details: zod_1.z.object({
        tip: zod_1.z.record(zod_1.z.any()).optional(),
    }),
    amount_received: zod_1.z.number().nonnegative(),
    application: zod_1.z.string().nullable(),
    application_fee_amount: zod_1.z.number().nullable(),
    automatic_payment_methods: zod_1.z.any().nullable(),
    canceled_at: zod_1.z.number().nullable(),
    cancellation_reason: zod_1.z.string().nullable(),
    capture_method: zod_1.z.string(),
    client_secret: zod_1.z.string(),
    confirmation_method: zod_1.z.string(),
    created: zod_1.z.number(),
    currency: zod_1.z.string(),
    customer: zod_1.z.string().nullable(),
    description: zod_1.z.string().nullable(),
    invoice: zod_1.z.string().nullable(),
    last_payment_error: zod_1.z.any().nullable(),
    latest_charge: zod_1.z.string().nullable(),
    livemode: zod_1.z.boolean(),
    metadata: zod_1.z.record(zod_1.z.any()).optional(),
    next_action: zod_1.z.any().nullable(),
    on_behalf_of: zod_1.z.string().nullable(),
    payment_method: zod_1.z.string().nullable(),
    payment_method_configuration_details: zod_1.z.any().nullable(),
    payment_method_options: zod_1.z.object({
        card: zod_1.z.object({
            installments: zod_1.z.any().nullable(),
            mandate_options: zod_1.z.any().nullable(),
            network: zod_1.z.string().nullable(),
            request_three_d_secure: zod_1.z.string(),
        }),
    }),
    payment_method_types: zod_1.z.array(zod_1.z.string()),
    processing: zod_1.z.any().nullable(),
    receipt_email: zod_1.z.string().nullable(),
    review: zod_1.z.any().nullable(),
    setup_future_usage: zod_1.z.any().nullable(),
    shipping: zod_1.z.any().nullable(),
    source: zod_1.z.any().nullable(),
    statement_descriptor: zod_1.z.string().nullable(),
    statement_descriptor_suffix: zod_1.z.string().nullable(),
    status: zod_1.z.string(),
    transfer_data: zod_1.z.any().nullable(),
    transfer_group: zod_1.z.string().nullable(),
});
const confirmPayment = zod_1.z.object({
    orderId: zod_1.z.string({
        required_error: "Order ID is required",
    }),
    customerId: zod_1.z.string({
        required_error: "Customer ID is required",
    }),
    amount: zod_1.z.number({
        required_error: "Amount is required",
    }).positive("Amount must be greater than zero"),
    transactionId: zod_1.z.string().nullable(),
    status: zod_1.z.enum(["PENDING", "SUCCESS", "FAILED", "REFUNDED"], {
        required_error: "Status is required",
    }),
    metadata: paymentMetadataSchema,
});
exports.paymentValidation = {
    createPaymentIntent, confirmPayment
};
