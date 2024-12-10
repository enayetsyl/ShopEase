"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const shop_validation_1 = require("./shop.validation");
const fileUploader_1 = require("../../../helpers/fileUploader");
const shop_controller_1 = require("./shop.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = shop_validation_1.shopValidation.createShop.parse(JSON.parse(req.body.data));
    return shop_controller_1.ShopController.createShop(req, res, next);
});
router.get("/single/:shopId", shop_controller_1.ShopController.getAShopForShopDetailPage);
router.get("/", (0, auth_1.default)(client_1.UserRole.VENDOR), shop_controller_1.ShopController.getAShop);
router.get("/all", shop_controller_1.ShopController.getAllShops);
exports.ShopRoutes = router;
