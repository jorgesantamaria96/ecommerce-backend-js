const { Router } = require("express");
const { middleware } = require("../middlewares/index");

const {
  getProducts,
  getProductById,
  getProductsByCategory,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

const router = new Router();

router.get("/", getProducts);
router.get("/id/:id", getProductById);
router.get("/category/:category", getProductsByCategory);
router.post("/", middleware.isAdmin, postProduct);
router.put("/:idProduct", middleware.isAdmin, updateProduct);
router.delete("/:idProduct", middleware.isAdmin, deleteProduct);

module.exports = router;
