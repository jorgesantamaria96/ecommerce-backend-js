import { Router } from 'express';
import { middleware } from '../middlewares/index';

import {
  getProducts,
  getProductById,
  getProductsByCategory,
  postProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController';

const router = new Router();

router.get("/", getProducts);
router.get("/id/:id", getProductById);
router.get("/category/:category", getProductsByCategory);
router.post("/", middleware.isAdmin, postProduct);
router.put("/:idProduct", middleware.isAdmin, updateProduct);
router.delete("/:idProduct", middleware.isAdmin, deleteProduct);

export default router;
