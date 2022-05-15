import { Router } from 'express';
import { passportConfig } from '../middlewares/passport';
const { getUser } = require("../controllers/loginController");

const router = new Router();

//GET LOGIN

router.get("/", getUser);

//POST LOGIN

router.post("/", passportConfig.authenticate("local-login",{
  successRedirect:"/products.html",
  failureRedirect:"/loginError.html"
}))

export default router;

