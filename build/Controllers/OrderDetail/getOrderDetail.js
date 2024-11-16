"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.deleteOrderDetail = exports.createOrderDetail = exports.getOrderDetail = void 0;
const Order_1 = require("../../Models/Order");
const orderDetail_1 = require("../../Models/orderDetail");
const getOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield orderDetail_1.OrderDetail.findAll();
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getOrderDetail = getOrderDetail;
const createOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cart } = req.body;
    console.log(cart);
    const cartMap = cart.map((c) => __awaiter(void 0, void 0, void 0, function* () {
        const createOD = yield orderDetail_1.OrderDetail.create({
            name: c.name,
            vinylId: c.vinylId,
            units: c.units,
            amount: c.amount,
            taxAmount: c.taxAmount,
            totalAmount: c.totalAmount,
            orderStatus: c.orderStatus,
        });
        return createOD;
    }));
    try {
        res.status(200).json(cartMap);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.createOrderDetail = createOrderDetail;
const deleteOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderDetails = yield orderDetail_1.OrderDetail.findAll();
        if (orderDetails.length > 0) {
            for (const orderDetail of orderDetails) {
                yield orderDetail.destroy();
            }
            res.status(200).send({ message: "Deleted order details" });
        }
        else {
            res.status(404).send({ message: "orderDetails not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteOrderDetail = deleteOrderDetail;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.findAll();
        //console.log(orders);
        if (orders.length > 0) {
            // Si hay registros, elimínalos uno por uno
            for (const order of orders) {
                yield order.destroy();
            }
            res.status(200).json({ message: "Deleted order details successfully" });
        }
        else {
            res.status(404).json({ message: "Order not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteOrder = deleteOrder;
