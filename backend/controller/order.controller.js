import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import calculateOrderPrice from "../utils/calculateOrderPrice.js";


export const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error("No order items");
        }

        const itemsFromDB = await productModel.find({
            _id: { $in: orderItems.map((i) => i._id) }
        });

        const dbOrderItems = orderItems.map((itemsFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemsFromClient._id);

            if (!matchingItemFromDB) {
                res.status(400)
                throw new Error(`Product not found: ${itemsFromClient._id}`);
            }

            return {
                ...itemsFromClient,
                product: itemsFromClient._id,
                price: matchingItemFromDB.price,
                _id: itemsFromClient._id,
            };

        });

        const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
            calculateOrderPrice(dbOrderItems);

        const order = new orderModel({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("user", "id username");

        res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const userOrder = await orderModel.find({ user: req.user._id }).populate("user", "id username");

        res.json(userOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const countTotalOrders = async (req, res) => {
    try {
        const totalOrder = await orderModel.countDocuments();

        res.json({ totalOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const calculateTotalSales = async (req, res) => {
    try {
        const orders = await orderModel.find();
        const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        res.json({ totalSales });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const calculateTotalSalesByDate = async (req, res) => {
    try {
        const salesByDate = await orderModel.aggregate([
            {
                $match: {
                    isPaid: true,
                },
            }, {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$paidAt" }
                    },
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        res.json(salesByDate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const orderById = await orderModel.findById(id).populate("user", "id username email");

        if (orderById) {
            res.json(orderById);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Server ERROR" });
    }
}

export const markOrderAsPaid = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await orderModel.findById(id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,

            }

            const updateOrder = await order.save();
            res.status(200).json(updateOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }

    } catch (error) {
        res.status(400).json({ message: "Server ERROR" });
    }
}

export const markOrderAsDelivered = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await orderModel.findById(id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updateOrder = await order.save();
            res.status(200).json(updateOrder);
        } else{
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Server ERROR" });
    }
}