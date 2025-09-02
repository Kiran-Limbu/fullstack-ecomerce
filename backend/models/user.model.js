import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: [3, 'username should be 3 letter long ']
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false,
    }
},
    { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;

