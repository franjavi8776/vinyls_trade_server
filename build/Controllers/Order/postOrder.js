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
exports.postOrder = exports.history = void 0;
const Order_1 = require("../../Models/Order");
const history = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const youOrder = yield Order_1.Order.findAll();
        res.status(200).json(youOrder);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.history = history;
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, detail, tax, total, state } = req.body;
    try {
        const saveOrder = yield Order_1.Order.create({
            userEmail,
            detail,
            tax,
            total,
            state,
        });
        res.status(200).json(saveOrder);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.postOrder = postOrder;
