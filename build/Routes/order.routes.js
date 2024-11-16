"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postOrder_1 = require("../Controllers/Order/postOrder");
const router = (0, express_1.Router)();
router.get("/order", postOrder_1.history);
router.post("/order", postOrder_1.postOrder);
exports.default = router;
