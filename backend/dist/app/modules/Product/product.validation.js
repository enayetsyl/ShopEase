"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const createProduct = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
    }),
    description: zod_1.z.string({
        required_error: "Description is required",
    }),
    price: zod_1.z
        .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    })
        .min(0, "Price must be greater than or equal to 0"),
    discount: zod_1.z
        .number({
        invalid_type_error: "Discount must be a number",
    })
        .min(0, "Discount must be greater than or equal to 0").optional(),
    categoryId: zod_1.z.string({
        required_error: "Category ID is required",
    }),
    inventory: zod_1.z
        .number({
        required_error: "Inventory count is required",
        invalid_type_error: "Inventory must be a number",
    })
        .min(0, "Inventory must be greater than or equal to 0"),
});
const duplicateProduct = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
    }),
    description: zod_1.z.string({
        required_error: "Description is required",
    }),
    price: zod_1.z
        .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    })
        .min(0, "Price must be greater than or equal to 0"),
    discount: zod_1.z
        .number({
        invalid_type_error: "Discount must be a number",
    })
        .min(0, "Discount must be greater than or equal to 0").optional(),
    categoryId: zod_1.z.string({
        required_error: "Category ID is required",
    }),
    image: zod_1.z
        .array(zod_1.z.string().url({ message: "Each image must be a valid URL" }))
        .min(1, "At least one image is required"),
    inventory: zod_1.z
        .number({
        required_error: "Inventory count is required",
        invalid_type_error: "Inventory must be a number",
    })
        .min(0, "Inventory must be greater than or equal to 0"),
    vendorId: zod_1.z.string({
        required_error: "Vendor ID is required",
    }),
    shopId: zod_1.z.string({
        required_error: "Shop ID is required",
    })
});
const updateProduct = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z
        .number({
        invalid_type_error: "Price must be a number",
    })
        .min(0, "Price must be greater than or equal to 0")
        .optional(),
    discount: zod_1.z
        .number({
        invalid_type_error: "Discount must be a number",
    })
        .min(0, "Discount must be greater than or equal to 0").optional(),
    inventory: zod_1.z
        .number({
        invalid_type_error: "Inventory must be a number",
    })
        .min(0, "Inventory must be greater than or equal to 0")
        .optional(),
    image: zod_1.z
        .array(zod_1.z.string().url({ message: "Each image must be a valid URL" }))
        .optional(),
}).partial();
exports.productValidation = {
    createProduct, duplicateProduct, updateProduct
};
