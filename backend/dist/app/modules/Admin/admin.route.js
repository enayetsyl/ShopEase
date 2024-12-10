"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
// !User related routes
router.get("/users", (0, auth_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.getAllUser);
router.get("/users/:userId", (0, auth_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.getUserById);
router.patch("/users/:userId", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.userValidation.updateUser), admin_controller_1.AdminController.updateUserIntoDB);
router.delete("/users/:userId", (0, auth_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.deleteUserFromDB);
// !Vendor related routes 
router.patch("/shop/:shopId", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(admin_validation_1.adminValidation.blacklistVendorShop), admin_controller_1.AdminController.blacklistVendorShop);
// !Categories related routes
router.post("/categories", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(admin_validation_1.adminValidation.createCategory), admin_controller_1.AdminController.createACategory);
router.get("/categories", (0, auth_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.getAllCategories);
router.get("/categories/:categoryId", (0, auth_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.getACategory);
router.patch("/categories/:categoryId", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(admin_validation_1.adminValidation.updateCategory), admin_controller_1.AdminController.updateACategory);
router.delete("/categories/:categoryId", (0, auth_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.deleteACategory);
exports.AdminRoutes = router;
