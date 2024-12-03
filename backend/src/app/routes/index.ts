import express from 'express'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { AdminRoutes } from '../modules/Admin/admin.route';
import { ShopRoutes } from '../modules/Shop/shop.route';
import { ProductRoutes } from '../modules/Product/product.route';

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

]

moduleRoutes.forEach(route=> router.use(route.path, route.route))

export default router;