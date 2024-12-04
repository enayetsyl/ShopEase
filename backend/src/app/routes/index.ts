import express from 'express'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { AdminRoutes } from '../modules/Admin/admin.route';
import { ShopRoutes } from '../modules/Shop/shop.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { FlashSaleRoutes } from '../modules/FlashSale/flashSale.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';
import { OrderRoutes } from '../modules/Order/order.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/admin",
    route: AdminRoutes
  },
  {
    path: "/shop",
    route: ShopRoutes
  },
  {
    path: "/products",
    route: ProductRoutes
  },
  {
    path: "/orders",
    route: OrderRoutes
  },
  {
    path: "/flash-sale",
    route: FlashSaleRoutes
  },
  {
    path: "/payment",
    route: PaymentRoutes
  },

]

moduleRoutes.forEach(route=> router.use(route.path, route.route))

export default router;