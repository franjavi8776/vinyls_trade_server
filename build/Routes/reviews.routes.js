"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_controllers_1 = require("../Controllers/Users/reviews.controllers");
const router = (0, express_1.Router)();
router.get("/reviews", reviews_controllers_1.getAllReviews);
router.post("/reviews", reviews_controllers_1.createReview);
exports.default = router;
