"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const shop_route_1 = require("../modules/Shop/shop.route");
const product_route_1 = require("../modules/Product/product.route");
const flashSale_route_1 = require("../modules/FlashSale/flashSale.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const order_route_1 = require("../modules/Order/order.route");
const follow_route_1 = require("../modules/Follows/follow.route");
const reviews_route_1 = require("../modules/Reviews/reviews.route");
const recentProduct_route_1 = require("../modules/RecentProduct/recentProduct.route");
const chatbot_route_1 = require("../modules/Chatbot/chatbot.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
    {
        path: "/shop",
        route: shop_route_1.ShopRoutes,
    },
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/flash-sale",
        route: flashSale_route_1.FlashSaleRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: "/follows",
        route: follow_route_1.FollowRoutes,
    },
    {
        path: "/reviews",
        route: reviews_route_1.ReviewRoutes,
    },
    {
        path: "/recent-products",
        route: recentProduct_route_1.RecentProductRoutes,
    },
    {
        path: "/chat-bot",
        route: chatbot_route_1.ChatBotRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
