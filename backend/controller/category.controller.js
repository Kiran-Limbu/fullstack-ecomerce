import categoryModel from "../models/category.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name.trim()) {
            return res.json({ error: "Name is required" });
        }

        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            return res.json({ errro: "Already exist product" })
        }

        const category = await categoryModel.create({ name });
        res.json(category);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)

    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await categoryModel.findOne({ _id: categoryId })

        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }

        category.name = name

        const updatedCategory = await category.save();

        res.json(updatedCategory);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })

    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await categoryModel.findOne({ _id: categoryId })

        if (category) {
            await category.deleteOne(category)
            return res.status(200).json({ message: "Category deleted sucessfully ✅" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Internal server error" });
    }
});

const listCategory = asyncHandler(async (req, res) => {
    try {
        const allcategory = await categoryModel.find({});
        return res.status(200).json(allcategory)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        const category = await categoryModel.findOne({ _id: categoryId });
        res.json(category);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message)
    }
})

export {
    createCategory,
    updateCategory,
    deleteCategory,
    listCategory,
    getCategoryById
}


