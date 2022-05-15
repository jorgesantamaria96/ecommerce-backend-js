const { Router } = require("express");
const { middleware } = require("../middlewares/index");
const {
  getOrders,
  getAllOrders,
  postOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");

const router = new Router();

router.get("/", middleware.isRegister, getOrders);
router.get("/", middleware.isAdmin, getAllOrders);
router.post("/:idCart", middleware.isRegister, postOrder);
router.put("/:idOrder", middleware.isAdmin, updateOrder);
router.delete("/:idOrder", middleware.isAdmin, deleteOrder);

module.exports = router;
