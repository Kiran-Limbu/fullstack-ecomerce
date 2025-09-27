import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true,
        maxLength: 32,
        unique: true
    },
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;