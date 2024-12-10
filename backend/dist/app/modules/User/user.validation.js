"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const registerUser = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "Password is required"
    }),
    email: zod_1.z.string({
        required_error: "Email is required"
    }),
    name: zod_1.z.string({
        required_error: "Name is required"
    }),
    role: zod_1.z.enum([client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR, client_1.UserRole.ADMIN])
});
const updateUser = zod_1.z.object({
    isSuspended: zod_1.z.boolean()
});
const blacklistVendor = zod_1.z.object({
    isBlacklisted: zod_1.z.boolean().optional(),
});
exports.userValidation = {
    registerUser, blacklistVendor, updateUser
};
