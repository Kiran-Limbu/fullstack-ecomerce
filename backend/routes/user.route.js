import express from "express";
import { createUser, loginUser } from "../controller/user.controller.js";
const router = express.Router();

router.route('/').post(createUser);
router.post('/logIn', loginUser);
// router.post('logout', logoutUser);

export default router;

