import express from "express";
import { authUser, authAdmin } from "../middlewares/auth.middleware";
import { createCategory } from "../controller/category.controller";
const router = express.Router();


router.route('/').post(createCategory)

export default router;
