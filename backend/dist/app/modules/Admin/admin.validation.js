"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const zod_1 = require("zod");
const createCategory = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required"
    }),
    description: zod_1.z.string().optional()
});
const updateCategory = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional()
});
const blacklistVendorShop = zod_1.z.object({
    isBlackListed: zod_1.z.boolean()
});
exports.adminValidation = {
    createCategory, updateCategory, blacklistVendorShop
};
