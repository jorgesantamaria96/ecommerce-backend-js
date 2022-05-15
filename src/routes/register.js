const { Router } = require("express");
const multer = require("multer");
const { passportConfig } = require("../middlewares/passport");

const upload = multer({ dest: "public/avatars/" });
const router = new Router();

router.post(
  "/",
  upload.single("avatar"),
  passportConfig.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/registerError.html",
  })
);

module.exports = router;
