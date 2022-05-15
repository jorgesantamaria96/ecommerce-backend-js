import { Router } from 'express';
const router = new Router();

router.get("/", (req, res) => {
  req.logout();
  // req.session.destroy();
  res.redirect('/login.html');
})

export default router;