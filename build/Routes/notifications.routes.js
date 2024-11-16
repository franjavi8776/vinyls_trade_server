"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Notifications_1 = require("../Controllers/Notifications/Notifications");
const router = (0, express_1.Router)();
router.post("send_notification", Notifications_1.enviarNotificacionDeCompra);
exports.default = router;
