const { Router } = require("express");
const { passportConfig } = require("../middlewares/passport");
const { getUser } = require("../controllers/loginController");

const router = new Router();

router.get("/", getUser);
router.post(
  "/",
  passportConfig.authenticate("local-login", {
    successRedirect: "/products.html",
    failureRedirect: "/loginError.html",
  })
);

module.exports = router;
