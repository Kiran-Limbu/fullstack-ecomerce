import express from "express";
import { authUser, authAdmin } from "../middlewares/auth.middleware.js";
import {
    createCategory,
    deleteCategory,
    listCategory,
    updateCategory,
    getCategoryById
} from "../controller/category.controller.js";
const router = express.Router();


router.route("/").post(authUser, authAdmin, createCategory);
router.route("/:categoryId")
    .put(authUser, authAdmin, updateCategory)
    .delete(authUser, authAdmin, deleteCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(getCategoryById);


export default router;
