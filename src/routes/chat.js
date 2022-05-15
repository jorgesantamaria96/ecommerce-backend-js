import { Router } from 'express';
import { middleware } from '../middlewares/index';

import {
  getPublicChat,
  postPublicMessage,
  getChatByEmail,
  getPrivateChatByUser,
  postPrivateMessage
} from "../controllers/chatController";

const router = new Router();

router.get("/", middleware.isRegister, getPublicChat);
router.post("/", middleware.isRegister, postPublicMessage);
router.get("/:email", middleware.isAdmin, getChatByEmail);
router.get("/private", middleware.isRegister, getPrivateChatByUser);
router.post("/private", middleware.isRegister, postPrivateMessage);

export default router;
