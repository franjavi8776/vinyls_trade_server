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
exports.createOrderDetail = void 0;
const orderDetail_1 = require("../../Models/orderDetail");
const createOrderDetail = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = body;
    console.log(cart);
    const cartMap = cart.map((c) => __awaiter(void 0, void 0, void 0, function* () {
        const createOD = yield orderDetail_1.OrderDetail.create({
            name: c.name,
            vinylId: c.vinylId,
            units: c.units,
            amount: c.amount,
            taxAmount: c.taxAmount,
            totalAmount: c.totalAmount,
            orderStatus: c.orderStatus
        });
        return createOD;
    }));
    try {
        return { status: 200, json: cartMap };
    }
    catch (error) {
        return { status: 500, json: 'error en el servidor' };
    }
});
exports.createOrderDetail = createOrderDetail;
