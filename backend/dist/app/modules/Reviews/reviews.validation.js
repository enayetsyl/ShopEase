"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const createReview = zod_1.z.object({
    productId: zod_1.z.string({
        required_error: "Product Id is required",
    }),
    comment: zod_1.z.string({
        required_error: "Comment is required",
    }),
    rating: zod_1.z
        .number({
        required_error: "Rating is required",
    })
        .min(0, "Rating must be at least 0")
        .max(5, "Rating must be at most 5"),
});
exports.reviewValidation = {
    createReview
};
