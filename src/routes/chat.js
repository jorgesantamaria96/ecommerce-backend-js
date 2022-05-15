const { Router } = require("express");
const { middleware } = require("../middlewares/index");

const {
  getPublicChat,
  postPublicMessage,
  getChatByEmail,
  getPrivateChatByUser,
  postPrivateMessage,
} = require("../controllers/chatController");

const router = new Router();

router.get("/", middleware.isRegister, getPublicChat);
router.post("/", middleware.isRegister, postPublicMessage);
router.get("/:email", middleware.isAdmin, getChatByEmail);
router.get("/private", middleware.isRegister, getPrivateChatByUser);
router.post("/private", middleware.isRegister, postPrivateMessage);

module.exports = router;
