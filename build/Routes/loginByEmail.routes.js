"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../Controllers/Users/login.controllers");
const router = (0, express_1.Router)();
router.post("/login", login_controllers_1.loginUser);
exports.default = router;
