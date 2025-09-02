import userModel from '../models/user.model.js';
import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/createToken.utils.js';

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("All filed are required !");
    }

    const allreadyExistUser = await userModel.findOne({ email });

    if (allreadyExistUser) {
        res.status(400).send("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        generateToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const allreadyExistUser = await userModel.findOne({ email });

    if (!allreadyExistUser) {
        return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        allreadyExistUser.password
    );

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    generateToken(res, allreadyExistUser._id);

    res.status(200).json({
        _id: allreadyExistUser._id,
        username: allreadyExistUser.username,
        email: allreadyExistUser.email,
        isAdmin: allreadyExistUser.isAdmin
    });
    return; //it stop the code right before
}

// const logoutUser = asyncHandler( async (req, res) =>{

// })


export { createUser, loginUser };