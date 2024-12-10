"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    productId: zod_1.z.string({
        required_error: "Product ID is required",
    }),
    quantity: zod_1.z
        .number({
        required_error: "Quantity is required",
    })
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than zero"),
    price: zod_1.z
        .number({
        required_error: "Price is required",
    })
        .positive("Price must be greater than zero"),
    discount: zod_1.z
        .number({
        required_error: "Discount is required",
    })
        .min(0, "Discount cannot be negative"),
});
const createOrder = zod_1.z.object({
    vendorId: zod_1.z.string({
        required_error: "Vendor ID is required",
    }),
    totalAmount: zod_1.z
        .number({
        required_error: "Total amount is required",
    })
        .positive("Total amount must be greater than zero"),
    products: zod_1.z
        .array(productSchema, {
        required_error: "Products are required",
    })
        .nonempty("At least one product is required"),
});
exports.OrderValidation = {
    createOrder
};
