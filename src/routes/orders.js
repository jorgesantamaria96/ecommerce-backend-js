import { Router } from 'express';
import { middleware } from '../middlewares/index';
import {
  getOrders,
  getAllOrders,
  postOrder,
  updateOrder,
  deleteOrder
} from '../controllers/ordersController';

const router = new Router();

router.get("/", middleware.isRegister, getOrders);
router.get("/", middleware.isAdmin, getAllOrders);
router.post("/:idCart", middleware.isRegister, postOrder);
router.put("/:idOrder", middleware.isAdmin, updateOrder);
router.delete("/:idOrder", middleware.isAdmin, deleteOrder);

export default router;