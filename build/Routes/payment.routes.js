"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../Controllers/MercadoPago/payment");
const router = (0, express_1.Router)();
router.post("/create_order", payment_1.createOrder);
router.post("/webhook", payment_1.verifyPayment);
exports.default = router;
