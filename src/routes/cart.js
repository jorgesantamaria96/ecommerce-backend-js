const express = require("express");
const { middleware } = require("../middlewares/index");

const {
  createCart,
  addProductToCarrito,
  deleteCart,
  deleteProductFromCart,
  getProductsFromCart,
  getCarts,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", middleware.isRegister, createCart);
router.post("/:idCart/:idProduct", middleware.isRegister, addProductToCarrito);
router.delete("/:id", middleware.isRegister, deleteCart);
router.delete(
  "/:idCart/:idProduct",
  middleware.isRegister,
  deleteProductFromCart
);
router.get("/:id", middleware.isRegister, getProductsFromCart);
router.get("/", middleware.isAdmin, getCarts);

module.exports = router;
