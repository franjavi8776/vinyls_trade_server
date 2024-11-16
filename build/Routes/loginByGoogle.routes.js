"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../Controllers/Users/login.controllers");
const router = (0, express_1.Router)();
router.get("/google", login_controllers_1.loginGoogle);
exports.default = router;
