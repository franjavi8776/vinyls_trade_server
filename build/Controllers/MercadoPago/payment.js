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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createOrder = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
const orderDetail_1 = require("../../Models/orderDetail");
const getOrderDetail_1 = require("../OrderDetail/getOrderDetail");
const getOrderDetail_2 = require("../OrderDetail/getOrderDetail");
const Notifications_1 = require("../Notifications/Notifications");
mercadopago_1.default.configure({
    sandbox: true,
    access_token: "TEST-5240565219201009-090712-67305e7f259028a53ae62015ae9f6938-1472124079",
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, units } = req.body;
        const result = yield mercadopago_1.default.preferences.create({
            items: [
                {
                    title: title,
                    currency_id: "USD",
                    unit_price: price,
                    quantity: units,
                },
            ],
            back_urls: {
                success: "https://vinils-trade-client.vercel.app",
                failure: "https://vinils-trade-client.vercel.app",
            },
            auto_return: "approved",
            notification_url: "https://vinyls-trade-back-production.up.railway.app/webhook",
        });
        res.status(200).send(result.body.init_point);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }
});
exports.createOrder = createOrder;
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.query;
    const paymentId = req.query["data.id"];
    try {
        if (type === "payment") {
            yield (0, getOrderDetail_1.deleteOrder)(req, res);
            const data = yield mercadopago_1.default.payment.findById(Number(paymentId));
            //console.log(data);
            yield orderDetail_1.OrderDetail.findAll();
            const saveOrder = yield (0, getOrderDetail_2.createOrderDetail)(req, res);
            yield (0, Notifications_1.enviarNotificacionDeCompra)(req, res);
            yield (0, getOrderDetail_1.deleteOrderDetail)(req, res);
            res.status(200).json(saveOrder);
        }
        else {
            res.status(400).json({ message: "Invalid query parameter type" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }
});
exports.verifyPayment = verifyPayment;
