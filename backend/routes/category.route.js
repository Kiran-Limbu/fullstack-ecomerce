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

router.get("/categories", listCategory);                                    
router.get("/:id", getCategoryById);


export default router;
