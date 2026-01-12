import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config();

// db connection
import connectToDB from './config/db/db.js'
import userRoutes from './routes/user.route.js'
import categoryRoutes from './routes/category.route.js'
import productRoute from './routes/product.route.js'
import uploadRoutes from './routes/upload.route.js'
import orderRoutes from './routes/order.routes.js'

connectToDB()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoute);
app.use('/api/uploads', uploadRoutes);
app.use('/api/orders', orderRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads'))); 


export default app;