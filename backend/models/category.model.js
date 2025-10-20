import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true
    },
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;