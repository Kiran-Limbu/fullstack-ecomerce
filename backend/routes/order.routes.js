import express from 'express';
const router = express.Router();

import {
    createOrder,
    getAllOrders,
    getUserOrders,
    countTotalOrders,
    calculateTotalSales,
    calculateTotalSalesByDate,
    getOrderById,
    markOrderAsPaid,
    markOrderAsDelivered
} from '../controller/order.controller.js';
import { authAdmin, authUser } from '../middlewares/auth.middleware.js';



router.route("/").post(authUser, createOrder)
    .get(authUser, authAdmin, getAllOrders);

router.route("/myOrder").get(authUser, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authUser, getOrderById);
router.route("/:id/pay").put(authUser, markOrderAsPaid);
router.route("/:id/deliver").put(authUser, authAdmin, markOrderAsDelivered);


export default router;