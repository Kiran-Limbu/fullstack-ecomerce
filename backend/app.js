import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config();

// db connection
import connectToDB from './config/db/db.js'
connectToDB()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(cookieParser());

app.get('/', (req , res) =>{
    res.send("hello vai sab");
})

export default app;