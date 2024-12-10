"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopValidation = void 0;
const zod_1 = require("zod");
const createShop = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required"
    }),
    description: zod_1.z.string({
        required_error: "Description is required"
    }),
    logo: zod_1.z.string().optional()
});
exports.shopValidation = {
    createShop
};
