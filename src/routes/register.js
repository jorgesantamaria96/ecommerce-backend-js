import { Router } from 'express';
import multer from 'multer';
import { passportConfig } from '../middlewares/passport';

const upload = multer({ dest: 'public/avatars/' })
const router = new Router();

router.post("/", upload.single('avatar'), passportConfig.authenticate("local-signup",{
    successRedirect:"/",
    failureRedirect:"/registerError.html"
}))

export default router;